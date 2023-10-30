---
title: Get all VST parameters to CSV in Reaper
author: hoanglongplanner
date: 2023.27.10
linkcolor: blue
header-includes:
  - \usepackage[a4paper, total={6in, 8in}]{geometry}
  - \usepackage{fancyhdr}
  - \usepackage{fancyvrb}
  - \usepackage{lastpage}
  - \pagestyle{fancy}
  - \fancyfoot[LO,LO]{(c)2023 - hoanglongplanner}
  - \fancyfoot[CO,CE]{Page \thepage\ of \pageref{LastPage}}
  - \fancyfoot[RO,RO]{CC BY-SA 4.0}
---

![Parameters of Surge VST to CSV](../image/preview.png)

\pagebreak

(c)2023 - hoanglongplanner

![](../image/by-sa.png)

This work is licensed under CC BY-SA 4.0

\tableofcontents

# Links

- [https://github.com/hoanglongplanner/share-blog/tree/main/doc](https://github.com/hoanglongplanner/share-blog/tree/main/doc)
- [https://github.com/hoanglongplanner/share-blog/blob/main/doc/hoanglongplanner-ReaperVSTPresetCSV.pdf](https://github.com/hoanglongplanner/share-blog/blob/main/doc/hoanglongplanner-ReaperVSTPresetCSV.pdf)
- [https://github.com/hoanglongplanner/share-blog/tree/main/src](https://github.com/hoanglongplanner/share-blog/tree/main/src)
- [https://github.com/hoanglongplanner/share-blog/tree/main/src/hoanglongplanner-ReaperVSTPresetCSV](https://github.com/hoanglongplanner/share-blog/tree/main/src/hoanglongplanner-ReaperVSTPresetCSV)
- [https://youtu.be/ir-Vk7YBjHo?si=2MeEDHw0jYWVCrbS](https://youtu.be/ir-Vk7YBjHo?si=2MeEDHw0jYWVCrbS)

# References

- [https://www.cockos.com/EEL2/](https://www.cockos.com/EEL2/)
- [https://www.cockos.com/reaper/sdk/reascript/reascripthelp.html](https://www.cockos.com/reaper/sdk/reascript/reascripthelp.html)
- [https://forum.cockos.com/showthread.php?t=180466](https://forum.cockos.com/showthread.php?t=180466)
- [https://forum.cockos.com/showthread.php?t=132627](https://forum.cockos.com/showthread.php?t=132627)
- [https://forum.cockos.com/showpost.php?p=2249924&postcount=447](https://forum.cockos.com/showpost.php?p=2249924&postcount=447)

\pagebreak

# Video Showcase

[https://youtu.be/ir-Vk7YBjHo?si=2MeEDHw0jYWVCrbS](https://youtu.be/ir-Vk7YBjHo?si=2MeEDHw0jYWVCrbS)

# Introduction

Tldr: Use Reaper to get all parameters of a VST in the 1st track and export those values to CSV and TXT.

This script was written as ELL2 format that Reaper support. More info can be found at [https://www.cockos.com/EEL2/](https://www.cockos.com/EEL2/) with ReaScript API [https://www.cockos.com/reaper/sdk/reascript/reascripthelp.html](https://www.cockos.com/reaper/sdk/reascript/reascripthelp.html)

Use cases:

- Archival purpose, export VST parameters into raw readable format text
- For use in other audio software products (if possible)

This script able to export to following formats:

- CSV
- TXT
- From then on, you can use 3rd party libraries to convert to other formats (JSON, XML, etc...)

# Acknowledgement - Disclaimer - Limitation

This code was written by users, on Reaper forum post. I make changes to better suited for purposes stated above, the script test okay on Reaper 6.72 / Windows 11.

This script has limitations, since this is just a wrapper script that use Reaper API calls to get these values available publicly

- This is just a spreadsheet with all parameters listed
- In order to really get the real preset of specific plugin, it would have to be the native format is using however sometimes it will be encrypted with unreadable weird symbols and gibberish binary stuffs

Please note: This script will never be accurate, only the native format (XML, JSON, H2P, NMSV, FXP, FXB, etc...) that each audio instrument supports is

To illustrate this inaccuracy I'm talking about, here are some examples

- In H2P preset use for u-he synths, a long string full of numbers and letter, supposedly represent as sample wavetable, which this script cannot extract it from the internal engine of u-he audio instruments
- Some audio instruments will use values as Enum types, so you have to guess what the real context between 0 and 1

\pagebreak

# Code Breakdown

## Get Values from Track

The code below will initialize and set the values by using provided Reaper API functions, in this case we only want to get parameter values from the 1st track only.

\begin{Verbatim}[numbers=left, frame=single]
RV = TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_pv);
pval = TrackFX_GetParam(tr, 0, Pidx,  minval, maxval);
pval_ex = TrackFX_GetParamEx(tr, 0, Pidx, minval_ex, maxval_ex, midval_ex);
pval_norm  = TrackFX_GetParamNormalized(tr, 0, Pidx);
RV = TrackFX_GetParameterStepSizes(tr, 0, Pidx, step, smallstep
, largestep, istoggle);
\end{Verbatim}

## Parameter Values

The code below will get parameter values (different from context value), round and automatically append these values into #pv2 array

- parameterValue (current, min, max, middle)
- contextValue (current, min, max, middle)
- step (how much to increase and decrease knob, 0.1 0.01 0.001) (DISCARD)
- isToggle (in theory it should only be 0 or 1) (DISCARD)

Note: DISCARD meaning it won't be present in the new script, I discard these value because they are not helpful at all. (You could compare the old and new CSV files provided in Github repo).

\begin{Verbatim}[numbers=left, frame=single]
// ! ORIGINAL VERSION
sprintf(#pv2,
"%05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, 
%05.2f, %05.2f,%05.2f, %05.2f, %05.2f,\ ",
minval,
maxval,
minval_ex,
midval_ex,
maxval_ex,
step,
smallstep,
largestep,
istoggle,
pval,
pval_ex,
pval_norm
);
\end{Verbatim}

\pagebreak

\begin{Verbatim}[numbers=left, frame=single]
// ! NEW VERSION
sprintf(#pv2,
  "%05.2f, %05.2f, %05.2f, %05.2f,\ ", 
  pval_norm,
  midval_ex,
  minval,
  maxval
);
\end{Verbatim}

## Context Values

The code below will get context values.

These are just hacks to get highest/lowest/middle value by manipulating Reaper to set the 1st track of highest/lowest/middle possible value.

\begin{Verbatim}[numbers=left, frame=single]
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
\end{Verbatim}

\pagebreak

## Append to array

All value items in #pv2 array will be appended to #pvalues

\begin{Verbatim}[numbers=left, frame=single]
#pvalues += #pv2; 
\end{Verbatim}

## Export to

The code below specify where Reaper should export those VST parameters to (CSV and TXT), please change this to suit your own need. By default, Reaper will export at the script folder.

![CSV Filepath Location](../image/exportfilepath.png)

\begin{Verbatim}[numbers=left, frame=single]
//--FilePath--
K_FileLocation_CSV = "/Scripts/VstPresetParameter.csv"; 
K_FileLocation_TXT = "/Scripts/VstPresetParameter.txt";
ParseTo(K_FileLocation_CSV);
ParseTo(K_FileLocation_TXT);
\end{Verbatim}

\pagebreak

# Source Code (New)

\begin{Verbatim}[numbers=left, frame=single]
//2023.10.19 hoanglongplanner
//Get a list of parameter names from the FX to CSV

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
  RV = TrackFX_GetParameterStepSizes(tr, 0, Pidx, step, 
  smallstep, largestep, istoggle);
  
  sprintf(#pv2,
  "%05.2f,%05.2f,%05.2f,%05.2f,", 
  pval_norm,
  midval_ex,
  minval,
  maxval
  );
  
  //Get context current
  #pv2 += #form_pv;
  
  //Reaper Hack to get context middle value
  TrackFX_SetParam(tr, 0, Pidx, midval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_def);
  #pv2 += ",";
  #pv2 += #form_def;
  
  //Reaper Hack to get context minimum value
  TrackFX_SetParam(tr, 0, Pidx, minval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_min);
  #pv2 += ",";
  #pv2 += #form_min;
  
  //Reaper Hack to get context maximum value
  TrackFX_SetParam(tr, 0, Pidx, maxval_ex);
  TrackFX_GetFormattedParamValue(tr, 0, Pidx, #form_max);
  #pv2 += ",";
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
  (tr = GetSelectedTrack(0, 0)) && (num_params = TrackFX_GetNumParams(tr, 0)) ? 
  (
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
      
      #K_HEADER = "ID,Name,Value Current,Value Middle,Value Min,Value Max
      ,Context Current,Context Middle,Context Min,Context Max\n";

      //Write header table
      fwrite(file, #K_HEADER, 0);
      
      //--Write to File--
      //Init Loop Index Number
      idx = 0; 

      loop(num_params,TrackFX_GetParamName(tr, 0, idx, #param_name) ? (
          //Prefix Param Num
          sprintf(#pvalues,"%03d,", idx +1-1);
          //Append parameter name
          #pvalues += #param_name;
          //Seperate parameter value
          #pvalues += ",";
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
\end{Verbatim}

\pagebreak

# Source Code (Old)

\begin{Verbatim}[numbers=left, frame=single]
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
    RV = TrackFX_GetParameterStepSizes(tr, 0, Pidx, step, 
    smallstep, largestep, istoggle);

    sprintf(#pv2,"%05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f
    , %05.2f, %05.2f,%05.2f, %05.2f, %05.2f,\ ", 
    minval, 
    maxval, 
    minval_ex, 
    midval_ex, 
    maxval_ex, 
    step, 
    smallstep, 
    largestep, 
    istoggle, 
    pval, 
    pval_ex, 
    pval_norm );
    
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
    (tr = GetSelectedTrack(0, 0)) && (num_params = TrackFX_GetNumParams(tr, 0)) ? 
    (
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

            msg_s("Value Min Max Ex  Min  Mid Max");
            msg_s("Steps Toggle Value ValEx ValNorm ParameterName\n");
            
            #K_HEADER = "PARAM ID, Name, Min, Max, 
            Min Val Extreme, Middle Val Extreme, Max Val Extreme, 
            Steps, Steps Small, Step Large, IsToggle, 
            Value, Val Extreme, Value Normalize, 
            Context Current, Context Middle, Context Min, Context Max\n";

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
                    
                    //Output the end of sentence
                    msg_s(#pvalues);
                    
                    //Write all into file
                    fwrite(file, #pvalues, 0);
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
\end{Verbatim}