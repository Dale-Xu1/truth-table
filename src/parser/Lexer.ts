export enum TokenType
{
    IDENTIFIER,
    NOT,
    CONJUNCTION, DISJUNCTION,
    CONDITION, BICONDITION,
    PAREN_OPEN, PAREN_CLOSE,
    END_OF_INPUT
}

export class Token
{

    public constructor(private location: number, private type: TokenType, private value: string) { }


    public getLocation(): number
    {
        return this.location
    }

    public getType(): TokenType
    {
        return this.type;
    }

    public getValue(): string
    {
        return this.value;
    }

}

class Lexer
{

    private index = 0;


    public constructor(private data: string) { }


    public next(): Token
    {
        // Skip whitespace
        this.skipWhitespace();
        let current = this.getCurrent();

        let token = null

        // Test for one character tokens
        switch (current)
        {
            case "\0": return new Token(this.index, TokenType.END_OF_INPUT, current)

            case "￢":
                token = new Token(this.index, TokenType.NOT, current)
                break

            case "∧":
                token = new Token(this.index, TokenType.CONJUNCTION, current)
                break

            case "∨":
                token = new Token(this.index, TokenType.DISJUNCTION, current)
                break
            
            case "→":
                token = new Token(this.index, TokenType.CONDITION, current)
                break

            case "↔":
                token = new Token(this.index, TokenType.BICONDITION, current)
                break
                
            case "(":
                token = new Token(this.index, TokenType.PAREN_OPEN, current)
                break
                
            case ")":
                token = new Token(this.index, TokenType.PAREN_CLOSE, current)
                break

            default:
                // Test for identifier
                if (this.isIdentifier(current))
                {
                    let start = this.index;
        
                    // Identifiers can be any length
                    while (this.isIdentifier(this.getCurrent()))
                    {
                        this.nextChar();
                    }
        
                    let value = this.data.slice(start, this.index);
                    return new Token(start, TokenType.IDENTIFIER, value);
                }
        
                throw new Error(`[${this.index}] Invalid character: '${current}'`);
        }
        
        this.nextChar()
        return token
    }

    private skipWhitespace(): void
    {
        // Skip character until non-whitespace is found
        while (/[ \t\n\r]/.test(this.getCurrent()))
        {
            this.nextChar();
        }
    }
    
    private isIdentifier(char: string): boolean
    {
        return /[a-zA-Z]/.test(char);
    }


    private getCurrent(): string
    {
        return this.lookahead(0);
    }

    private lookahead(offset: number): string
    {
        // Get character at index and \0 if out of bounds
        let index = this.index + offset;
        return index < this.data.length ? this.data[index] : "\0";
    }

    private nextChar(): void
    {
        if (this.index < this.data.length)
        {
            this.index++;
        }
    }

}

export default Lexer
