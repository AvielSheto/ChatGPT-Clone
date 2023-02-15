import NewChat from "./NewChat"

function SideBar() {
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                {/* New Chat */}
                <NewChat/>
            </div>

            <div>
                {/* ModelSelection */}
            </div>

            {/* map */}

        </div>

    </div>
  )
}

export default SideBar