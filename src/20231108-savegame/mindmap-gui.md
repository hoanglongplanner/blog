```mermaid
---
title: Gui Page Flow
---

graph TD;

Ask_SaveOverwrite
Ask_LoadOverwrite
Ask_Restart
Ask_RestartCheckpoint
Ask_RestartMission
Ask_BackToMainMenu
Ask_ExitToMainMenu
Ask_ExitToDesktop
Ask_ExitToOS
Ask_Default
Ask_Yes
Ask_No

Info_WarnPlayer

Caution_NoResourceFound
Caution_GameLoadFail

SplashScreen
TitleScreen

MainMenu

Options
Preferences
Display
Audio
Graphics

Help
Codex
Extras
Exit

Gameplay
Choice
AutoDiaglogue
Inventory
Equipment
Chat
Phone

Save
Load
QuickSave
QuickLoad

ExitToTitleScreen
ExitToMainMenu

ExitToDesktop
ExitToOS

SplashScreen --> TitleScreen --> MainMenu
```