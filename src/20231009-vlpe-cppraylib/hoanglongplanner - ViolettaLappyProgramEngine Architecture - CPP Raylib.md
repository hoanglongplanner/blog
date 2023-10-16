---
title: ViolettaLappyProgramEngine Architecture - CPP Raylib
author: hoanglongplanner
date: 2023.10.09
---

# ViolettaLappyProgramEngine Architecture - CPP Raylib
Author: hoanglongplanner 

Organization: ViolettaLappy

Last Updated: 2023.10.09

# Table of Contents
- [ViolettaLappyProgramEngine Architecture - CPP Raylib](#violettalappyprogramengine-architecture---cpp-raylib)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Software Diagram Flow](#software-diagram-flow)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Generate project file](#generate-project-file)
  - [How to build your project at the end](#how-to-build-your-project-at-the-end)
- [Windows](#windows)
- [Linux](#linux)
- [WebGL](#webgl)
- [Cmake Configuration](#cmake-configuration)
  - [root](#root)
  - [src](#src)
  - [3rdparty](#3rdparty)
- [Folder Structure](#folder-structure)
- [Script](#script)

# Introduction

This is rather a program template how to make your own software using the following tech:
- Cmake
- C++
- Raylib (4.5.0)
- Imgui

Demo project is in the following url:
- url insert here

# Software Diagram Flow

Insert your own program diagram here

# Getting Started

## Requirements
- Visual Studio 2022
- Windows

## Generate project file
2 main ways:
- Create build folder in project
- Run

## How to build your project at the end
# Windows
Simply build based on CmakeList.txt

# Linux
- Open your terminal
- Create makefile
- Build

# WebGL
You need emscripten to build your app in the end

# Cmake Configuration

- Get code from

## root
This is at the top level of CMakeList.txt

## src
This is where your code here

## 3rdparty
This is where all 3rdparty package here

# Folder Structure
For more options, please see cmake config to configure how your projects work

data
data/font
data/audio

# Script
Entry point is main.cpp

Engine code is in:
- src/pe
- src/pe-extra