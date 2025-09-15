import { useEffect } from "react"

export default function List({lists, onListChange}) {

    useEffect(() => {
        if (lists.length > 0) {
            localStorage.setItem("liste", JSON.stringify(lists));
        }
    }, [lists])

    return (
        <div className="board">
            <div className="board-row">
                {lists.map((elem) => {
                    return elem.map((elem, index) => {
                        return <div key={index}>
                                    {elem.taskName}
                                    <> </>
                                    {elem.status}
                                    <> </>
                                    {elem.description}
                               </div>
                    })
                })}
            </div>
        </div>
    )
}

