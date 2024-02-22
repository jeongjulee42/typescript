// stack,  string, push, pop
type StringNode = {
    data:string;
    next:StringNode | null;
};

class StringStack {
    private first: StringNode | null;
    constructor(){
        this.first = null;
    }
    push(str: string) {
        let newNode: StringNode = {
            data: str,
            next: this.first
        }
        this.first = newNode
    }
    pop(): string{
        if(this.first === null){
            throw new Error('there is no data in stack')
        }
        let newNode = this.first;
        this.first = newNode.next;
        return newNode.data
    }
    show(){
        let next = this.first
        while(next !== null){
            console.log(next.data)
            next = next.next
        }
        console.log("---end---")
    }
}

let stk = new StringStack();
stk.show()
stk.push("asd");
stk.push("!23");
stk.push("gvsdv");
stk.push("dbs");
stk.push("nbdfg");
stk.show();

console.log("---pop---");
console.log(stk.pop())
console.log(stk.pop())
console.log("---end---");
stk.pop();
stk.show();