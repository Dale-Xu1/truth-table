import { Tree } from "../parser/Tree"
import { Column, IdentifierColumn } from "./Column"

class Table
{

    private identifiers: IdentifierColumn[] = []
    private columns: Column[] = []


    public compile(tree: Tree)
    {
        tree.compile(this)

        this.initializeIdentifiers()
        this.initializeColumns()
    }

    private initializeIdentifiers(...row: boolean[])
    {
        if (row.length < this.identifiers.length)
        {
            this.initializeIdentifiers(...row, true)
            this.initializeIdentifiers(...row, false)
        }
        else
        {
            for (let i = 0; i < row.length; i++)
            {
                this.identifiers[i].add(row[i])
            }
        }
    }

    private initializeColumns()
    {
        for (let column of this.columns)
        {
            column.initialize()
        }
    }


    public addIdentifier(identifier: IdentifierColumn): IdentifierColumn
    {
        let tree = identifier.getTree()

        for (let i = 0; i < this.identifiers.length; i++)
        {
            let existing = this.identifiers[i]

            if (existing.getTree().equals(tree))
            {
                return existing
            }
        }

        this.identifiers.push(identifier)
        return identifier
    }

    public addColumn<T extends Column>(column: T): T
    {
        let tree = column.getTree()

        for (let i = 0; i < this.columns.length; i++)
        {
            let existing = this.columns[i]

            if (existing.getTree().equals(tree))
            {
                return existing as T
            }
        }

        this.columns.push(column)
        return column
    }


    public getIdentifiers(): IdentifierColumn[]
    {
        return this.identifiers
    }

    public getColumns(): Column[]
    {
        return this.columns
    }

}

export default Table
