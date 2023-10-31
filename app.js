require('dotenv').config()

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// // Find conversation ID using the conversations.list method
// async function findConversation(name) {
//   try {
//     // Call the conversations.list method using the built-in WebClient
//     const result = await app.client.conversations.list({
//       // The token you used to initialize your app
//       token: process.env.SLACK_BOT_TOKEN
//     });

//     for (const channel of result.channels) {
//       console.log("channel:" +channel.name)
//       if (channel.name === name) {
//         var conversationId = channel.id;

//         // Print result
//         console.log("Found conversation ID: " + conversationId);
//         // Break from for loop
//         break;
//       }
//     }
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// // Find conversation with a specified channel `name`
// findConversation("test-channel-1");
// // C063H242XRR

async function postMessage(channelId, message) {
  try {
    // Call the chat.postMessage method using the WebClient
    const result = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId,
      text: message
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

postMessage("C063H242XRR", "Hello randos!");


// All the room in the world for your code
app.event('app_home_opened', async ({ event, client, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome to your _App's Home_* :tada:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click me!"
                }
              }
            ]
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
