import Lexer, { Token, TokenType } from "./Lexer"
import { Tree, IdentifierTree, UnaryTree, BinaryTree } from "./Tree"

class Parser
{

    private lexer: Lexer
    private token: Token


    public constructor(equation: string)
    {
        this.lexer = new Lexer(equation)
        this.token = this.lexer.next()
    }


    public parse(): Tree | null
    {
        try
        {
            // Parse expression and expect equation to end
            let tree = this.bicondition()
            this.expect(TokenType.END_OF_INPUT)
            
            return tree
        }
        catch (e)
        {
            // Log errors that occur
            console.error(e.message)
            return null
        }
    }

    private bicondition(): Tree
    {
        // Parses binary expression
        let left = this.condition()

        while (this.match(TokenType.BICONDITION))
        {
            let right = this.condition()
            left = new BinaryTree(TokenType.BICONDITION, left, right)
        }

        return left
    }

    private condition(): Tree
    {
        let left = this.disjunction()

        while (this.match(TokenType.CONDITION))
        {
            let right = this.disjunction()
            left = new BinaryTree(TokenType.CONDITION, left, right)
        }

        return left
    }

    private disjunction(): Tree
    {
        let left = this.conjunction()

        while (this.match(TokenType.DISJUNCTION))
        {
            let right = this.conjunction()
            left = new BinaryTree(TokenType.DISJUNCTION, left, right)
        }

        return left
    }

    private conjunction(): Tree
    {
        let left = this.not()

        while (this.match(TokenType.CONJUNCTION))
        {
            let right = this.not()
            left = new BinaryTree(TokenType.CONJUNCTION, left, right)
        }

        return left
    }

    private not(): Tree
    {
        // Parses unary expression
        if (this.match(TokenType.NOT))
        {
            return new UnaryTree(TokenType.NOT, this.not())
        }

        return this.literal()
    }

    private literal(): Tree
    {
        let token = this.token

        if (this.match(TokenType.IDENTIFIER))
        {
            // Identifiers are the only type of literal
            return new IdentifierTree(token.getValue())
        }
        else if (this.match(TokenType.PAREN_OPEN))
        {
            // Returns precedence back to root
            let tree = this.bicondition()
            this.expect(TokenType.PAREN_CLOSE)

            return tree
        }

        throw new Error(`[${token.getLocation()}] Unexpected [${TokenType[token.getType()]}] "${token.getValue()}"`)
    }


    private expect(type: TokenType): void
    {
        // Attemps match
        let token = this.token
        if (this.match(type)) return

        // Results in error if it doesn't
        throw new Error(`[${token.getLocation()}] Expected [${TokenType[type]}] but got [${TokenType[token.getType()]}] "${token.getValue()}"`)
    }
    
    private match(type: TokenType): boolean
    {
        // Tests if current token is of a certain type
        let result = this.token.getType() === type

        if (result)
        {
            // Moves onto next token if successful
            this.token = this.lexer.next()
        }

        return result
    }

}

export default Parser
