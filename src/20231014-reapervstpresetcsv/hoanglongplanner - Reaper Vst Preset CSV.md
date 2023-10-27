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

# Related Links
- Source Code
- Blogger
- LinkedIn
- Link to PDF Format Pandoc
- Link to original format Reaper Forum

# Introduction

tldr: Use Reaper to get all parameters of a VST in the 1st track and export those values to CSV and TXT. Source code is in [Related Links](#related-links)

This script was written as ELL2 format that Reaper support. More info can be found here 
- https://www.cockos.com/EEL2/

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

These are just hacks to get highest/lowest/middle value by manipulating Reaper to set the 1st track of highest/lowest/middle possible value.

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

The code below specify will get the following values and round them and push into #pv2 array
- min
- max
- middle
- step (DISCARD)
- isToggle (DISCARD)
- contextValue

This version is however the old version, which I discarded

```c
sprintf(#pv2,"%05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f, %05.2f,%05.2f, %05.2f, %05.2f,\ ", 
                       minval, maxval, minval_ex, midval_ex, maxval_ex,
                       step, smallstep, largestep, istoggle, 
                       pval, pval_ex, pval_norm );
```

The code below specify where Reaper should export those VST parameters to (CSV and TXT).

```c
//--FilePath--
K_FileLocation_CSV = "/Scripts/VstPresetParameter.csv"; 
K_FileLocation_TXT = "/Scripts/VstPresetParameter.txt";
ParseTo(K_FileLocation_CSV);
ParseTo(K_FileLocation_TXT);
```