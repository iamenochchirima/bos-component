const contract = "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801"

const messages = Near.view(contract, "get_messages", { limit: 3 })

const Page = styled.div`
background : #4A5568;
min-height: 100vh;
color: white;
`

const Message = styled.div`
display: flex;
flex-direction: column;
margin-left: 0.5em;
margin-top: 1em;
order: 2;
`

const Join = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 1em;
  margin-top: 1em;
  border-radius: 0.75rem; 
  border: 1px solid #fff; 
  padding: 0.75em; 
  overflow-y: auto;
`

const JoinButton = styled.div`
padding: 1.5rem 2rem; 
border-radius: 0.5rem; 
background-color: #3B82F6;
color: white;
cursor: pointer;
`

const SendControls = styled.div`
display:flex;
gap: 20px;
margin-bottom: 0.5em;
border-top: 1px solid #fff;
padding-left: 1em;
padding-top: 1em; 
`
State.init({
    joinChat: false,
    myName: "",
    message: "",
})

const sendMessage = async () => {
    if (state.message.length != 0) {
        console.log(state.message)
        Near.call(contract, "send", {
            text: state.message
        })
    }
}

return <Page>

    {state.myName.length === 0 ? <div style={{
        display: "flex",
        justifyContent: "center",
        alignTtems: "center"
    }} >
        {state.joinChat ? <ChatContainer>
            <div>
                <h3 style={{
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                    color: "#CBD5E0",
                    textAlign: "center"
                }}>NexusChat</h3>
            </div>
            {/* <pre>
                {JSON.stringify(Social.get("iamenochchirima.near/**"), null, 2)}
            </pre> */}
            <div style={{ minHeight: '300px' }}>
                {messages.map((message) => (

                    <Message key={message.id} style={{
                        alignItems: message.author === "iamenochchirima.near" ? "flex-end" : "flex-start",
                    }} className="">
                        <div className="" style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <span>{message.author}</span>
                            <Widget
                                src="andyh.near/widget/TimeAgo"
                                props={{
                                    blockHeight: message.block_height
                                }}
                            />
                        </div>

                        <span style={{
                            backgroundColor: "iamenochchirima.near" === message.author ? "#3B82F6" : "#E5E7EB",
                            color: "iamenochchirima.near" === message.author ? "#FFFFFF" : "#4B5563",
                            borderRadius: "0.5rem",
                            display: "inline-block",
                            padding: "5px",
                            marginRight: "0.5rem",
                        }}>{message.text}</span>
                    </Message>

                ))}
            </div>
            <SendControls>
                <input type="text" value={state.message} onInput={(e) => State.update({ message: e.target.value })} />
                <button onClick={sendMessage}>Send</button>
            </SendControls>
        </ChatContainer> :
            <Join> <JoinButton onClick={() => State.update({ joinChat: true })}
            >Join a Chat
            </JoinButton></Join>}</div> :
        <div>
            {messages.map((message) => (
                <Message className="">
                    <Widget
                        src="calebjacob.near/widget/AccountProfile"
                        props={{
                            accountId: message.author
                        }}
                    />
                    <Widget
                        src="andyh.near/widget/TimeAgo"
                        props={{
                            blockHeight: message.block_height
                        }}
                    />
                    <p>{message.text}</p>
                </Message>
            ))}
            <SendControls>
                <input style={{ color: "#A0AEC0" }} placeholder="Write your message!" type="text" value={state.message} onInput={(e) => State.update({ message: e.target.value })} />
                <button onClick={sendMessage}>Send</button>

            </SendControls>
        </div>}
</Page>