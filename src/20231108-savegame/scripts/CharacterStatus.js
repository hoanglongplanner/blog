const KCharacterStatus = {
    Rank: "",
    Class: "",
    Level: "",
    CurrentExperience: "",
    NextRequiredExperience: "",

    //Morality
    Threat: "",
    Reputation: "",
    Good: "",
    Evil: "",
    Notorius: "",

    //Status
    Life: "",
    Health: "",
    Magic: "",
    Special: "",
    Fever: "",
    Action: "",
};

function getCharacterStatuses(){
    return [CharacterStatus()];
};

class CharacterStatus{}