import { BinaryColumn, Column, IdentifierColumn, UnaryColumn } from "../table/Column"
import Table from "../table/Table"
import { TokenType } from "./Lexer"

export abstract class Tree
{

    public abstract compile(table: Table): Column

    public abstract equals(tree: Tree): boolean

}

export class IdentifierTree extends Tree
{

    public constructor(private name: string) { super() }
    

    public compile(table: Table): IdentifierColumn
    {
        return table.addIdentifier(new IdentifierColumn(this))
    }

    public equals(tree: Tree): boolean
    {
        return tree instanceof IdentifierTree && tree.name === this.name
    }


    public getName(): string
    {
        return this.name
    }

}

export class UnaryTree extends Tree
{

    public constructor(private operator: TokenType, private expression: Tree) { super() }

    
    public compile(table: Table): UnaryColumn
    {
        let expression = this.expression.compile(table)

        return table.addColumn(new UnaryColumn(this, expression))
    }
    
    public equals(tree: Tree): boolean
    {
        return tree instanceof UnaryTree && tree.operator === this.operator && tree.expression.equals(this.expression)
    }


    public getOperator(): TokenType
    {
        return this.operator
    }

}

export class BinaryTree extends Tree
{

    public constructor(private operator: TokenType, private left: Tree, private right: Tree) { super() }
    

    public compile(table: Table): BinaryColumn
    {
        let left = this.left.compile(table)
        let right = this.right.compile(table)

        return table.addColumn(new BinaryColumn(this, left, right))
    }
    
    public equals(tree: Tree): boolean
    {
        return tree instanceof BinaryTree && tree.operator === this.operator && tree.left.equals(this.left) && tree.right.equals(this.right)
    }

    
    public getOperator(): TokenType
    {
        return this.operator
    }

}
