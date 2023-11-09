class ProgramValue{

    constructor(
        value,
        valueDefault,
        valueMin, 
        valueMax, 
        restraintMin, 
        restraintMax, 
        limitMin, 
        limitMax,
        systemMin = Number.MIN_VALUE,
        systemMax = Number.MAX_VALUE)
    {
        this.value = value;
        this.valueDefault = valueDefault;
        this.valueMin = valueMin;
        this.valueMax = valueMax;
        this.restraintMin = restraintMin;
        this.restraintMax = restraintMax;
        this.limitMin = limitMin;
        this.limitMax = limitMax;
        this.systemMin = systemMin;
        this.systemMax = systemMax;
    }

    getValue(){
        return this.arg_value;
    }

    getValueMin(){
        return this.arg_valueMin;
    }

    getValueMax(){
        return this.arg_valueMax;
    }

    setValue(arg_value){
        //if <> system
        //if <> limit
        //if <> restraint
        this.arg_value = arg_value;
    }

    setValueDefault(arg_value){
        this.valueDefault = arg_value;
    }

    setSystemMin(arg_value = Number.MIN_VALUE){
        this.systemMin = arg_value;
    }

    setSystemMax(arg_value = Number.MAX_VALUE){
        this.systemMax = arg_value;
    }
};