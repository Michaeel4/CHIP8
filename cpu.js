

// Chip-8 

class CPU {

    constructor(){
        this.registers = Uint8Array(16).fill(0x00);
        this.memory = Uint8Array(4096).fill(0x00);

        this.i = 0x0000;
        this.sp = 0x0000;
        this.delayTimer = 0x00;
        this.soundTimer = 0x00;

        this.pc = 0x0200;
    }

    getRegisterName(index){
        return "V" + index.toString(16).toUpperCase();
    }

    
    fetch(opcode){

        switch(opcode){
            case 0x00E0:
                this.clearScreen();
                break;

            case 0x00EE:
                this.returnFromSubroutine();
                break;

          
            
            
        }
    }



}