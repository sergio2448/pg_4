import React, { useState } from 'react'
import axios from 'axios'
import { ChatEngine, getOrCreateChat} from 'react-chat-engine'
import { useSelector } from 'react-redux'
const apiKey = "09a79b0b-a117-4e29-88fd-34d2deff8547"

const DirectChatPage = ({seller}) => {
    const [newUserChat, setNewUserChat] = useState(null)
    const userDB = useSelector((state) => state.user)

    React.useEffect(() => {
        axios.post(
            `https://api.chatengine.io/users/`,
            {
                first_name: userDB.user.name,
                last_name: userDB.user.name,
                username: userDB.user.email,
                secret: '123',
                email: userDB.user.email,
            },
            { headers: { "Private-Key": apiKey } }
        ).then((response) => {
            setNewUserChat(response.data)
        })
        .catch((error) => {
            console.log('Create chat user', error.response)
        })
        /* axios.post(
            `https://api.chatengine.io/users/`,
            {
                first_name: "user2",
                last_name: userDB.user.name,
                username: userDB.user.email,
                secret: '123',
                email: userDB.user.email,
            },
            { headers: { "Private-Key": apiKey } }
        ).then((response) => {
            setNewUserChat(response.data)
        })
        .catch((error) => {
            console.log('Create chat user', error.response)
        }) */
        
    },[])
    
	return (
		<ChatEngine
			height='100vh'
			userName='adam'
			userSecret='123'
			projectID='114d76a3-2f1a-4735-8dd1-bb4bfc8854d7'
            renderNewChatForm={(e) => getOrCreateChat(
                e,
                { is_direct_chat: true, usernames: seller },
                () => setUsername('')
            )}
		/>
	)
}

export default DirectChatPage;