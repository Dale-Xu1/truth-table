import React, { ChangeEvent, FormEvent } from "react"
import "./App.css"
import Parser from "./parser/Parser";
import { Column } from "./table/Column";
import Table from "./table/Table";

interface Props { }

interface State
{
    equation: string
    table: Table | null
}

class App extends React.Component<Props>
{

    public state: State =
    {
        equation: "",
        table: null
    }


    public constructor(props: Props)
    {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    private handleSubmit(e: FormEvent)
    {
        e.preventDefault()

        let parser = new Parser(this.state.equation)
        let tree = parser.parse()

        if (tree !== null)
        {
            let table = new Table()

            table.compile(tree)
            this.setState({ table })
        }
    }

    private handleChange(e: ChangeEvent<HTMLInputElement>)
    {
        this.setState({ equation: e.target.value });
    }

    public render(): React.ReactElement
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.equation} onChange={this.handleChange} />
                    <input type="submit" value="Generate" />
                </form>
                {
                    this.state.table !== null ?
                        <div className="table">
                            {
                                (this.state.table.getIdentifiers() as Column[]).concat(this.state.table.getColumns()).map(
                                    (column: Column, i: number) => (
                                        <div key={i}>
                                            <div className="box">{column.getString()}</div>
                                            {
                                                 column.getColumn().map((row: boolean, i: number) => row ? (
                                                    <div className="box true" key={i}>T</div>
                                                ) : (
                                                    <div className="box false" key={i}>F</div>
                                                ))
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                    : ""
                }
            </div>
        )
    }

}

export default App
