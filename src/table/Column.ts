import { TokenType } from "../parser/Lexer"
import { BinaryTree, IdentifierTree, Tree, UnaryTree } from "../parser/Tree"

export abstract class Column
{

    private column: boolean[] = []


    public constructor(private tree: Tree, private string: string) { }


    public abstract initialize(): void

    public getTree(): Tree
    {
        return this.tree
    }

    public getString(): string
    {
        return this.string
    }

    public getColumn(): boolean[]
    {
        return this.column
    }

}

export class IdentifierColumn extends Column
{

    public constructor(tree: IdentifierTree) { super(tree, tree.getName()) }


    public add(row: boolean): void
    {
        this.getColumn().push(row)
    }

    public initialize(): void { }

}

export class UnaryColumn extends Column
{

    private expression: Column


    public constructor(tree: UnaryTree, expression: Column)
    {
        let operator

        switch (tree.getOperator())
        {
            case TokenType.NOT:
                operator = "¬"
                break
        }

        super(tree, operator + expression.getString())
        this.expression = expression
    }
    

    public initialize(): void
    {
        let column = this.getColumn()
        let tree = this.getTree() as UnaryTree

        for (let row of this.expression.getColumn())
        {
            switch (tree.getOperator())
            {
                case TokenType.NOT:
                    column.push(!row)
                    break
            }
        }
    }

}

export class BinaryColumn extends Column
{

    private left: Column
    private right: Column


    public constructor(tree: BinaryTree, left: Column, right: Column)
    {
        let operator

        switch (tree.getOperator())
        {
            case TokenType.CONJUNCTION:
                operator = "∧"
                break

            case TokenType.DISJUNCTION:
                operator = "∨"
                break

            case TokenType.CONDITION:
                operator = "→"
                break

            case TokenType.BICONDITION:
                operator = "↔"
                break
        }

        super(tree, `${left.getString()} ${operator} ${right.getString()}`)
        this.left = left
        this.right = right
    }

    
    public initialize(): void
    {
        let column = this.getColumn()
        let tree = this.getTree() as UnaryTree

        let left = this.left.getColumn()
        let right = this.right.getColumn()

        for (let i = 0; i < left.length; i++)
        {
            switch (tree.getOperator())
            {
                case TokenType.CONJUNCTION:
                    column.push(left[i] && right[i])
                    break

                case TokenType.DISJUNCTION:
                    column.push(left[i] || right[i])
                    break

                case TokenType.CONDITION:
                    column.push(!left[i] || right[i])
                    break

                case TokenType.BICONDITION:
                    column.push(left[i] === right[i])
                    break
            }
        }
    }

}
