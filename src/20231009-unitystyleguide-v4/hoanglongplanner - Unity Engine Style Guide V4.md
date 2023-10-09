---
title: Unity Engine Style Guide V4.0
author: hoanglongplanner
date: 2023.10.09
---

# Unity Engine Style Guide V4.0
Author: hoanglongplanner 

Organization: ViolettaLappy

Last Updated: 2023.10.09

# Table of Contents
- [Unity Engine Style Guide V4.0](#unity-engine-style-guide-v40)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Standard Rules](#standard-rules)
- [Common Design Pattern](#common-design-pattern)
- [Camelcase](#camelcase)
- [Variable Naming](#variable-naming)
- [Considerations](#considerations)
- [References](#references)

# Introduction

This just a style guide, you don't need to uphold yourself to any standard, as long as you can work comfortable and get to the end product at the end.

The cons of using this style:
- Take more time to rewrite (which is not a good thing)
- NOT HUNGARIAN NOTATION BUT YET THE MINIMAL VERSION
- Your IDE is already good enough to deduce what type, if you hover the text (unless you use notepad)

Inspire by the following style guide:
- Google C++ Style Guide

Inspire by the following programming language:
- AngelScript
- Rust
- C++

# Standard Rules
- Natural as you can be
- Please try to avoid naming things with s character, it really is an OCD issue many times

# Common Design Pattern
- Composition
- Builder
- Singleton

# Camelcase
CamelCase
SnakeCase

# Variable Naming

private variable start with _
public variable must be name like this below

Array 
sz_somethingName
szn_somethingName
List 
list_something
listn_something

signed s32
unsigned u32

- int
- float
- double
- string
- char

# Considerations

It is a maddening process to say which is X Y Z in 3D Space

Please just use Roll Pitch Yaw as standard when talking to others regarding 3D Space

![Alt text](image/20231009-freyaholmer-3dcordinationchart.png)
![Alt text](image/20230910-sixdegreesoffreedom.jpg)

# References
- https://docs.godotengine.org/en/stable/tutorials/3d/introduction_to_3d.html
- https://mastodon.social/@acegikmo/109429307211544506
- https://simple.wikipedia.org/wiki/Pitch,_yaw,_and_roll
- https://github.com/ziglang/zig/issues/6417
- https://softwareengineering.stackexchange.com/questions/102689/what-is-the-benefit-of-not-using-hungarian-notation