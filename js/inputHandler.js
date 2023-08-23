export class InputHandler{
    constructor(){
        this.keys = [];
        const keysToListen = ['w', 'a', 's','d'];
        window.addEventListener('keydown', e => {
            if(keysToListen.includes(e.key.toLowerCase())
               && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if(keysToListen.includes(e.key.toLowerCase())){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    }
}