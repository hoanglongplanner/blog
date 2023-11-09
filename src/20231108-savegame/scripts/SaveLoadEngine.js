//(c)2023 ViolettaLappy - hoanglongplanner
//Apache2 License

//This script allow save load
//- Save Slot Feature

const K_SAVESLOT_MAX = 99;

const data = {
};

class CharacterStat{}
class CharacterSkill{}
class GameSession{}

function SaveToCSV(){}
function SaveToJSON(){}
function SaveToXML(){}

const KSaveSlotInfo = {
    Name: "",
    Context: "",
    DateTime: "",
    Playtime: "",
}

const KCharacterRank = {
    Name: "",
    CurrentExperience: "",
    NextRequiredExperience: "",
}

const KCharacterClass = {
    Name: "",
    CurrentExperience: "",
    NextRequiredExperience: "",
}

const KCharacterStat = {
    HealthBonus: "",
    ManaBonus: "",
    WindAttackBonus: "",

    Attack: "",
    PhysicalAttack: "",
    MagicAttack: "",
    SlashAttack: "",
    BluntAttack: "",
 	PierceAttack: "",

    CriticalChance: "",

    Defense: "",
    MagicDefense: "",
    PhysicalDefense: "",

    BleedEnhance: "",
    PoisonEnhance: "",

    StunResistance: "",
    BleedResistance: "",
    PoisonResistance: "",
}

const KGameSystem = {
    IsInitFirstTime,
}

const KGameSession = {
    Money: "",
    Gem: "",
    Crystal: "",
}

const KGameEvent = {
    IsCharacterDead: "",
    CanCharacterDead: "",
}

const KWeaponStat = {
    Attack: "",
    Defense: "",
    Cost: "",
    SellValue: "",
}