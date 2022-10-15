import Stack from 'stack-lifo';

const StackCalculator =(infix, setAnswer, setInfix)=>{
    infix = validateString(infix);
    let posfix=infixToPosfix(infix);
    let result= posfixToResult(posfix);
    setInfix(result.toString());
}
const validateString=(infix)=>{
    infix= infix.trim();
    return infix;
    
}
const isNumber =(strNumber)=>{
    if(strNumber>='0'&& strNumber<='9'){
        return true;
    }
    return false;
}
const isOperator =(operator)=>{
    switch(operator){
        case '+':
        case '-':
        case '*':
        case '/':
            return true;
        default:
            break;
    }
    return false;
}
const priority =(operator)=>{
    if(operator==='+'|| operator==='-'){
        return 1;
    }
    if(operator==='/'|| operator==='*'){
        return 2;
    }
    return 0;
}
const infixToPosfix =(infix)=>{
    const stack = new Stack();
    let posfix =[];
    let infixArray = infix.split(' ');
    if(infixArray && infixArray.length>0){
        infixArray.map((item)=>{
            if(isNumber(item)){
                posfix.push(item);
            }else
            if(item==='(' ){
                stack.push(item);
            }else if(item ===')' ){
               while(!stack.isEmpty()&&stack.peek()!=='('){
                    posfix.push(stack.peek());
                    stack.pop();
               }
               stack.pop();
            } else if(item ==='%'){
              posfix[posfix.length-1]= (posfix[posfix.length-1]*0.01).toString();
            }
            else{
                while(
                    !stack.isEmpty()&&isOperator(stack.peek())&&
                     priority(stack.peek())>=priority(item)
                     ){
                    posfix.push(stack.peek());
                    stack.pop();
                }
                    stack.push(item);
                  
                
            }
            return item;
        });
    }
    while(!stack.isEmpty()){
        posfix.push(stack.peek());
        stack.pop();
    }
    return posfix;
    
}
const calculator =(up, down, operator)=>{
    switch(operator){
        case '+':
            return  Number(down)+ Number(up);
        case '-':
            return Number(down)- Number(up);
        case '*':
            return Number(down)* Number(up);
        case '/':
            return Number(down)/ Number(up);
        default:
            break;
    }
}
const posfixToResult =(posfix)=>{
    const stack = new Stack();
    if(posfix && posfix.length>0){
        posfix.map((item)=>{
            if(isNumber(item)){
                stack.push(item);
            }else{
                let up = stack.peek();
                stack.pop();
                let down = stack.peek();
                stack.pop();
                stack.push(calculator(up, down, item));
            }
            return item;
        })
    }
    return stack.peek();
}

export default  StackCalculator;

