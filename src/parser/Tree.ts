import { BinaryColumn, Column, IdentifierColumn, UnaryColumn } from "../table/Column"
import Table from "../table/Table"
import { TokenType } from "./Lexer"

export abstract class Tree
{

    // Compile trees to columns
    public abstract compile(table: Table): Column

    // Test if trees are equal to each other to avoid repeat columns
    public abstract equals(tree: Tree): boolean

}

export class IdentifierTree extends Tree
{

    public constructor(private name: string) { super() }
    

    public compile(table: Table): IdentifierColumn
    {
        // Add identifier to table
        return table.addIdentifier(new IdentifierColumn(this))
    }

    public equals(tree: Tree): boolean
    {
        // Identifiers are the same if their names are
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
        // Compile expression
        let expression = this.expression.compile(table)

        // Add unary expression to table
        return table.addColumn(new UnaryColumn(this, expression))
    }
    
    public equals(tree: Tree): boolean
    {
        // Types and operators must be the same
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
        // Compile left and right operands
        let left = this.left.compile(table)
        let right = this.right.compile(table)

        // Add binary expression to table
        return table.addColumn(new BinaryColumn(this, left, right))
    }
    
    public equals(tree: Tree): boolean
    {
        // Types and operators must be the same
        return tree instanceof BinaryTree && tree.operator === this.operator && tree.left.equals(this.left) && tree.right.equals(this.right)
    }

    
    public getOperator(): TokenType
    {
        return this.operator
    }

}
