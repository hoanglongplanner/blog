---
title: Reaper Vst Parameter to CSV
author: hoanglongplanner
date: 2023.14.10
---

# Reaper VST Parameters to CSV, TXT format

# Table of Contents
- [Reaper VST Parameters to CSV, TXT format](#reaper-vst-parameters-to-csv-txt-format)
- [Table of Contents](#table-of-contents)
- [PDF Format](#pdf-format)
- [Title Images](#title-images)
- [Introduction](#introduction)
- [Acknowledgement \& Disclaimer](#acknowledgement--disclaimer)
- [Limitation](#limitation)
- [Features](#features)
- [Modified Source Code](#modified-source-code)
- [Code Explanation](#code-explanation)
- [References \& Links](#references--links)

# PDF Format
- Link to PDF Format Pandoc

# Title Images

// Add images

# Introduction

The one i'm using is ELL2 format (other than Lua) which Reaper claim that the syntax like Javascript

My use case so far 
- Archive purpose the VST parameters, unable to read it for other side, render the proprietary format into useless.

# Acknowledgement & Disclaimer

This code was written by DarkStar or some of other user, on Reaper forum post. ()

This approach is only a wrapper based on how Reaper get all parameters around VST of Steinberg specification, using Reaper 6.72.

To actually get the real preset
- It was encrypted as binary

There are some parameter functions that I'm currently not sure what about yet. (Steps, Context)

# Limitation
- This is just a wrapper script that use Reaper API calls to get these values publicly, which is not really the best way to know.
- This cannot turn into preset to be use in instrument.
- In order to really archive the real preset of specific plugin, it would have to be some kind of format that is readable in any text editors like this which anyone who use to manipulate data files (JSON, XML, even TXT)

1. H2P like u-he Zebralette or XML like Izotope Trash 2
2. Bad Readable Binary Format Gibberish like NMSV, FXP and FXB (FX Preset, FX Bank)

# Features
- Export FX Parameters into raw readable format text
- Export formats:
  - TXT
  - CSV

# Modified Source Code

```c
//Author: hoanglongplanner
//Date: July 1st 2023
//Modification of original script, 1st time scripter here
//Get a list of parameter names from the FX

//--
function msg_s(m)
/* Output message to Reaper Console */
//--
(
  ShowConsoleMsg(m);
  //ShowConsoleMsg("\n");
);


//--
function secondary_info(Pidx)
/* All info slider into this */
//--
(
    temp =1;
    
    RV = TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_pv);
    pval = TrackFX_GetParam(tr, 0, Pidx,  minval, maxval);
    pval_ex = TrackFX_GetParamEx(tr, 0, Pidx, minval_ex, maxval_ex, midval_ex);
    pval_norm  = TrackFX_GetParamNormalized(tr, 0, Pidx);
    RV = TrackFX_GetParameterStepSizes(tr, 0, Pidx, step, smallstep, largestep, istoggle);
    //            (a)           (b)                     (c)                             (d)
    sprintf(#pv2,"%05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f,%05.2f, %05.2f, %05.2f,\ ", 
                       minval, maxval, minval_ex, midval_ex, maxval_ex,
                       step, smallstep, largestep, istoggle, 
                       pval, pval_ex, pval_norm );
                       
    #pv2 += #form_pv;
    
    //Hack to get middle value
    TrackFX_SetParam(tr, 0, Pidx, midval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
    #pv2 += ", ";
    #pv2 += #form_def;
    
    //Hack to get minimum value
    TrackFX_SetParam(tr, 0, Pidx, minval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
    #pv2 += ", ";
    #pv2 += #form_min;
    
    //Hack to get maximum value
    TrackFX_SetParam(tr, 0, Pidx, maxval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_max);
    #pv2 += ", ";
    #pv2 += #form_max;
    
    //Stuff
    #pvalues += #pv2; 
    
    TrackFX_SetParam(tr, 0, Pidx, pval); //=> Return value to original set value
); // end of function

//--
function VSTParameterToCSV(file_name)
/* Get VST Parameter from the 1st track of Reaper, and 1st FX of that track */
//--
(
  //get first selected track and first FX
    (tr = GetSelectedTrack(0, 0)) && (num_params = TrackFX_GetNumParams(tr, 0)) ? (
        TrackFX_GetFXName(tr, 0, #FX_name);

        msg_s("\n \n============================== \n");
        #FX_name +="\n";
        
        msg_s(#FX_name);
        
        (file = fopen(file_name, "w")) ? 
        (
            //Write VST Name at the top of page
            fwrite(file, #FX_name, 0);
            
            TrackFX_GetPreset(tr, 0, #presetName);
            #presetName += "\n";
            fwrite(file, #presetName, 0);

            msg_s("         Value              Min     Max        Ex  Min  Mid    Max");
            msg_s("         Steps                      Toggle       Value      ValEx  ValNorm   ParameterName\n");
            
            #K_HEADER = "PARAM ID, Name, Min, Max, Min Val Extreme, Middle Val Extreme, Max Val Extreme, Steps, Steps Small, Step Large, IsToggle, Value, Val Extreme, Value Normalize, Context Current, Context Middle, Context Min, Context Max\n";
                                    
            fwrite(file, #K_HEADER, 0); //=> Write header table
            
            // Write to File
            idx = 0; //Init Loop Index Number
            loop(num_params,TrackFX_GetParamName(tr, 0, idx, #param_name) ? 
              (
                    sprintf(#pvalues,"%03d, ", idx +1-1); //=> Prefix Param Num
                    #pvalues += #param_name; //=> Append parameter name
                    #pvalues += ", ";
                    //#pvalues += #param_name; 
                    
                    pv = TrackFX_GetParam(tr, 0, idx, minvalOut, maxvalOut);
                    
                    //#pvalues +="\n"; //=> Ending parameter
                    
                    secondary_info(idx);
                    
                    #pvalues +="\n";
                    
                    //(idx +1) % 10  == 0 ? #pvalues += "\n"; //Add space for every 10 parameters
                    
                    msg_s(#pvalues); //=> Output the end of sentence
                    
                    fwrite(file, #pvalues, 0); //=> Write all into file

              );
              idx += 1; //Increase Loop Number
        );
            
            fclose(file);
        );
    );

); // end of function

//--FilePath--

K_FILE_NAME_CSV = "/Scripts/ParameterNames.csv"; 
K_FILE_NAME_TXT = "/Scripts/ParameterNames.txt";

VSTParameterToCSV(K_FILE_NAME_CSV);
VSTParameterToCSV(K_FILE_NAME_TXT);
```

# Code Explanation

Program Abstraction:
- We loop though all parameters available for that FX in Reaper
- Documenting all values into string variable
- Construct and Manipulate of strings
- Write these string into a file (CSV, TXT)

```c
//Hack to get middle value
TrackFX_SetParam(tr, 0, Pidx, midval_ex);
TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
#pv2 += ", ";
#pv2 += #form_def;
    
//Hack to get minimum value
TrackFX_SetParam(tr, 0, Pidx, minval_ex);
TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
#pv2 += ", ";
#pv2 += #form_min;
    
//Hack to get maximum value
TrackFX_SetParam(tr, 0, Pidx, maxval_ex);
TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_max);
#pv2 += ", ";
#pv2 += #form_max;
```

```c
sprintf(#pv2,"%05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f,%05.2f, %05.2f, %05.2f,\ ", 
                       minval, maxval, minval_ex, midval_ex, maxval_ex,
                       step, smallstep, largestep, istoggle, 
                       pval, pval_ex, pval_norm );
```

# References & Links
- Source Code
- Link to original format Reaper Forum
- Bad Binary Hex Format