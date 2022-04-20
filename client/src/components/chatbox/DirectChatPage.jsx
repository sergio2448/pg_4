import React, { useState } from 'react'
import axios from 'axios'
import { ChatEngine, getOrCreateChat} from 'react-chat-engine'
import { useSelector } from 'react-redux'
const apiKey = "c48cb9c3-8740-43c2-8fd3-5c8627eb9925"

const DirectChatPage = ({seller}) => {
    const [newUserChat, setNewUserChat] = useState([])
    const userDB = useSelector((state) => state.user)

    React.useEffect(async () => {
        console.log(seller)
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
        )
        .catch((error) => {
            console.log('Create chat user', error.response)
        });
        axios.post(
            `https://api.chatengine.io/users/`,
            {
                first_name: seller.name,
                last_name: seller.name,
                username: seller.email,
                secret: '123',
                email: seller.email,
            },
            { headers: { "Private-Key": apiKey } }
        )
        .catch((error) => {
            console.log('Create chat user', error.response)
        })
        
    },[])

    if(newUserChat.length !== 2) {
        console.log(newUserChat)
        axios.get(
            `https://api.chatengine.io/users/`,
            { headers: { "Private-Key": apiKey } }
        )
        .then((response) => {
            setNewUserChat(response.data)
        })
        .catch((error) => {
            console.log('Create chat user', error.response)
        })
    }

    function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [seller.email] },
		)
	}

    function renderChatForm(creds) {
		return (
			<div>
				<button 
                className='bg-sky-500 h-3/4'
                onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}
    
	return (
        <>
            {
                newUserChat.length === 2 ? <ChatEngine
                height='100vh'
                userName={userDB.user.email}
                userSecret='123'
                projectID='f290a589-49a0-4d64-92b8-8b9eecbf9f35'
                onConnect={(creds) => createDirectChat(creds)}
            /> : ""
            }
        </>
		
	)
}

export default DirectChatPage;