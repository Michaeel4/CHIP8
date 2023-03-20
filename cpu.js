

// Chip-8.

class CPU {

    constructor(){
        this.registers = new Uint8Array(16).fill(0x00);
        this.memory =new Uint8Array(4096).fill(0x00);

        this.i = 0x0000;
        this.sp = 0x0000;
        this.delayTimer = 0x00;
        this.soundTimer = 0x00;
        this.pc = 0x0200;
        this.stack = [];
    }

    getRegisterName(index){
        if(index >= 0 && index <= 0xF)
            return "V" + index.toString(16).toUpperCase();
        else
            return "Invalid Register: Vx" + index.toString(16).toUpperCase();
    }
    
    fetch(opcode){

        switch(opcode){
            case 0x00E0:
                this.clearScreen();
                break;

            case 0x00EE:
                this.returnFromSubroutine();
                break;


            case 0x1000:
                this.pc = opcode & 0x0FFF;
                break;
            
            case 0x2000:
                this.sp++;
                this.stack.push(this.pc);
                this.pc = opcode & 0x0FFF;
                break;
            case 0x3000:
                if(this.registers[(opcode & 0x0F00) >> 8] == (opcode & 0x00FF)){
                    this.pc += 2;
                }
                break;
            case 0x4000:
                if(this.registers[(opcode & 0x0F00) >> 8] != (opcode & 0x00FF)){
                    this.pc += 2;
                }
                break;
            case 0x5000:
                if(this.registers[(opcode & 0x0F00) >> 8] == this.registers[(opcode & 0x00F0) >> 4]){
                    this.pc += 2;
                }
                break;

            case 0x6000:
                this.registers[(opcode & 0x0F00) >> 8] = (opcode & 0x00FF);
                break;
            case 0x7000:
                this.registers[(opcode & 0x0F00) >> 8] += (opcode & 0x00FF);
                break;
            case 0x8000:
                this.registers([opcode & 0x0F00] >> 8) = this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8001:
                this.registers[(opcode & 0x0F00) >> 8] |= this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8002:
                this.registers[(opcode & 0x0F00) >> 8] &= this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8003:
                this.registers[(opcode & 0x0F00) >> 8] ^= this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8004:
                if(this.registers[(opcode & 0x0F00) >> 8] + this.registers[(opcode & 0x00F0) >> 4] > 0xFF){
                    this.registers[0xF] = 1;
                }else{
                    this.registers[0xF] = 0;
                }
                
                this.registers[(opcode & 0x0F00) >> 8] += this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8005:
                if(this.registers[(opcode & 0x0F00) >> 8] > this.registers[(opcode & 0x00F0) >> 4]){
                    this.registers[0xF] = 1;
                }else{
                    this.registers[0xF] = 0;
                }

                this.registers[(opcode & 0x0F00) >> 8] -= this.registers[(opcode & 0x00F0) >> 4];
                break;
            case 0x8006:
                if(this.registers[(opcode & 0x0F00) >> 8] & 0x1){
                    this.registers[0xF] = 1;
                }else{
                    this.registers[0xF] = 0;
                }
                this.registers[(opcode & 0x0F00) >> 8] >>= 1;
                break;
            case 0x8007:
                if(this.registers[(opcode & 0x00F0) >> 4] > this.registers[(opcode & 0x0F00) >> 8]){
                    this.registers[0xF] = 1;
                }else{
                    this.registers[0xF] = 0;
                }

                this.registers[(opcode & 0x0F00) >> 8] = this.registers[(opcode & 0x00F0) >> 4] - this.registers[(opcode & 0x0F00) >> 8];
                break;
            case 0x800E:
                if(this.registers[(opcode & 0x0F00) >> 8] & 0x80){
                    this.registers[0xF] = 1;
                }else{
                    this.registers[0xF] = 0;
                }
                this.registers[(opcode & 0x0F00) >> 8] <<= 1;
                break;
            case 0x9000:
                if(this.registers[(opcode & 0x0F00) >> 8] != this.registers[(opcode & 0x00F0) >> 4]){
                    this.pc += 2;
                }
                break;
            case 0xA000:
                this.i = opcode & 0x0FFF;
                break;
            case 0xB000:
                this.pc = (opcode & 0x0FFF) + this.registers[0x0];
                break;
            case 0xC000:
                this.registers[(opcode & 0x0F00) >> 8] = Math.floor(Math.random() * 0xFF) & (opcode & 0x00FF);
                break;
            case 0xD000:
                // 0xDXYN
                // position x determines the VX position and Y the VY dimension, n byte at position I.

                // as for the documentation, we need to read the least signifcant bit of the byte at position I, and then the next byte, and so on.
                // we need to read n bytes, and then we need to draw a sprite at position x, y with height n.


                
                for(var i = 0; i < (opcode & 0x000F); i++){
                    
                  );  
                this.drawSprite(this.registers[(opcode & 0x0F00) >> 8], this.registers[(opcode & 0x00F0) >> 4], opcode & 0x000F);
                break;


            
         

            

          
            
            
        }
    }


    drawSprite(x, y, height){
        //used to draw sprite at position x, y with height n.

    }



}




const cpu = new CPU();




console.log(cpu.getRegisterName(0xF));