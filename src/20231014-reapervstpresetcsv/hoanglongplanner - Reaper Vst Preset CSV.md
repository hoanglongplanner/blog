---
title: Reaper Vst Parameter to CSV
author: hoanglongplanner
date: 2023.14.10
---

# Reaper VST Parameters to CSV, TXT format

// Add title image here

# Table of Contents
- [Reaper VST Parameters to CSV, TXT format](#reaper-vst-parameters-to-csv-txt-format)
- [Table of Contents](#table-of-contents)
- [Related Links](#related-links)
- [Introduction](#introduction)
- [Acknowledgement \& Disclaimer \& Limitation](#acknowledgement--disclaimer--limitation)
- [Code Breakdown](#code-breakdown)
- [Original Source Code](#original-source-code)
- [Modified Source Code](#modified-source-code)

# Related Links
- Source Code
- Blogger
- LinkedIn
- Link to PDF Format Pandoc
- Link to original format Reaper Forum

# Introduction

tldr: How to get all parameters of a VST in Reaper and export to CSV and TXT. Source code is in [Related Links](#related-links)

This script is ELL2 format that Reaper currently default to

Extract all exposed paramters that Reaper has

Available use cases
- Archive purpose the VST parameters, unable to read it for other side, render the proprietary format into useless.
- Use for other audio programs

Has following features
- Export FX Parameters into raw readable format text
- Export formats:
  - TXT
  - CSV

# Acknowledgement & Disclaimer & Limitation

This code was written by DarkStar or other users, on Reaper forum post. Test on Reaper 6.72.

To actually get the real preset
- It was encrypted as binary

There are some parameter functions that I'm currently not sure what about yet. (Steps, Context)

This script has a limitation, since this is just a wrapper script that use Reaper API calls to get these values publicly, which is not really the best way to know.
- This cannot turn into preset to be use in instrument.
- In order to really archive the real preset of specific plugin, it would have to be some kind of format that is readable in any text editors like this which anyone who use to manipulate data files (JSON, XML, even TXT) not giberish stuffs

Two types:
1. H2P like u-he Zebralette or XML like Izotope Trash 2
2. Gibberish Readable Binary Format like NMSV, FXP and FXB (FX Preset, FX Bank)

# Code Breakdown

Program Abstraction:
- We loop though all parameters available for that FX in Reaper
- Documenting all values into string variable
- Construct and Manipulate of strings
- Write these string into a file (CSV, TXT)
- Real value, parameter value

```c
//Reaper Hack to get middle value
TrackFX_SetParam(tr, 0, Pidx, midval_ex);
TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
#pv2 += ", ";
#pv2 += #form_def;
    
//Reaper Hack to get minimum value
TrackFX_SetParam(tr, 0, Pidx, minval_ex);
TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
#pv2 += ", ";
#pv2 += #form_min;
    
//Reaper Hack to get maximum value
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

The code below specify where Reaper should export those VST parameters to specific file format (CSV and TXT).

```c
//--FilePath--
K_FileLocation_CSV = "/Scripts/VstPresetParameter.csv"; 
K_FileLocation_TXT = "/Scripts/VstPresetParameter.txt";
ParseTo(K_FileLocation_CSV);
ParseTo(K_FileLocation_TXT);
```

# Original Source Code

```c
//2023.10.19 hoanglongplanner
//Get a list of parameter names from the FX

//Output message to Reaper Console Terminal
function msg_s(m)
(
  ShowConsoleMsg(m);
  //ShowConsoleMsg("\n");
);


//All info slider into this
function secondary_info(Pidx)
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
    
    //Reaper Hack to get middle value
    TrackFX_SetParam(tr, 0, Pidx, midval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
    #pv2 += ", ";
    #pv2 += #form_def;
    
    //Reaper Hack to get minimum value
    TrackFX_SetParam(tr, 0, Pidx, minval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
    #pv2 += ", ";
    #pv2 += #form_min;
    
    //Reaper Hack to get maximum value
    TrackFX_SetParam(tr, 0, Pidx, maxval_ex);
    TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_max);
    #pv2 += ", ";
    #pv2 += #form_max;
    
    //Stuff
    #pvalues += #pv2; 
    
    //Return value to original set value
    TrackFX_SetParam(tr, 0, Pidx, pval);
);

//Get VST Parameter from the 1st track of Reaper, and 1st FX of that track
function VSTParameterToCSV(file_name)
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

            //Write header table
            fwrite(file, #K_HEADER, 0);
            
            //--Write to File--
            //Init Loop Index Number
            idx = 0; 
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
                    
                    //Add space for every 10 parameters
                    //(idx +1) % 10  == 0 ? #pvalues += "\n";
                    
                    msg_s(#pvalues); //=> Output the end of sentence
                    
                    fwrite(file, #pvalues, 0); //=> Write all into file

              );
              //Loop increment
              idx += 1;
        );
            
            fclose(file);
        );
    );

);

//--FilePath--
K_FileLocation_CSV = "/Scripts/ParameterNames.csv"; 
K_FileLocation_TXT = "/Scripts/ParameterNames.txt";
VSTParameterToCSV(K_FileLocation_CSV);
VSTParameterToCSV(K_FileLocation_TXT);
```

# Modified Source Code

```c
//2023.10.19 hoanglongplanner
//Get a list of parameter names from the FX

//Output message to Reaper Console Terminal
function msg_s(m)
(
  ShowConsoleMsg(m);
  ShowConsoleMsg("\n");
);

//All info slider into this
function secondary_info(Pidx)
(
  temp =1;
  
  RV = TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_pv);
  pval = TrackFX_GetParam(tr, 0, Pidx,  minval, maxval);
  pval_ex = TrackFX_GetParamEx(tr, 0, Pidx, minval_ex, maxval_ex, midval_ex);
  pval_norm  = TrackFX_GetParamNormalized(tr, 0, Pidx);
  RV = TrackFX_GetParameterStepSizes(tr, 0, Pidx, step, smallstep, largestep, istoggle);
  
  sprintf(#pv2,
  "%05.2f, %05.2f, %05.2f, %05.2f,\ ", 
  pval_norm,
  midval_ex,
  minval,
  maxval
  );
  
  //Get all values (current, middle, min, max)
  #pv2 += #form_pv;
  
  //Reaper Hack to get context middle value
  TrackFX_SetParam(tr, 0, Pidx, midval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
  #pv2 += ", ";
  #pv2 += #form_def;
  
  //Reaper Hack to get context minimum value
  TrackFX_SetParam(tr, 0, Pidx, minval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
  #pv2 += ", ";
  #pv2 += #form_min;
  
  //Reaper Hack to get context maximum value
  TrackFX_SetParam(tr, 0, Pidx, maxval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_max);
  #pv2 += ", ";
  #pv2 += #form_max;
  
  //Append all values
  #pvalues += #pv2; 
  
  //Return value to original set value
  TrackFX_SetParam(tr, 0, Pidx, pval);
);

//Get VST Parameter from the 1st track of Reaper, and 1st FX of that track
function ParseTo(file_name)
(
  //get first selected track and first FX
  (tr = GetSelectedTrack(0, 0)) && (num_params = TrackFX_GetNumParams(tr, 0)) ? (
    TrackFX_GetFXName(tr, 0, #FX_name);

    msg_s("\n \n============================== \n");
    #FX_name +="\n";
    
    msg_s(#FX_name);
    
    (file = fopen(file_name, "w")) ? (
      
      msg_s("Paste to file, please wait...");
    
      //Write VST Name at the top of page
      fwrite(file, #FX_name, 0);
      
      TrackFX_GetPreset(tr, 0, #presetName);
      #presetName += "\n";
      fwrite(file, #presetName, 0);      
      
      #K_HEADER = "ID, Name, Value Current, Value Middle, Value Min, Value Max, Context Current, Context Middle, Context Min, Context Max\n";

      //Write header table
      fwrite(file, #K_HEADER, 0);
      
      //--Write to File--
      //Init Loop Index Number
      idx = 0; 

      loop(num_params,TrackFX_GetParamName(tr, 0, idx, #param_name) ? (
          //Prefix Param Num
          sprintf(#pvalues,"%03d, ", idx +1-1);
          //Append parameter name
          #pvalues += #param_name;
          //Seperate parameter value
          #pvalues += ", ";
          //#pvalues += #param_name; 
          
          pv = TrackFX_GetParam(tr, 0, idx, minvalOut, maxvalOut);
          
          //Ending parameter
          //#pvalues +="\n";
          
          secondary_info(idx);
          
          #pvalues +="\n";
          
          //Add space for every 10 parameters
          //(idx +1) % 10  == 0 ? #pvalues += "\n";
          
          //Output the end of sentence
          //msg_s(#pvalues);
          
          fwrite(file, #pvalues, 0); //=> Write all into file
        );

        //Loop increment
        idx += 1;
      );

      fclose(file);
      msg_s("Successful Parse !!");
    );
  );

);

//--FilePath--
K_FileLocation_CSV = "/Scripts/VstPresetParameter.csv"; 
K_FileLocation_TXT = "/Scripts/VstPresetParameter.txt";
ParseTo(K_FileLocation_CSV);
ParseTo(K_FileLocation_TXT);
```