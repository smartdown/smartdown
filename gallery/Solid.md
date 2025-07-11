### Using Smartdown-on-Solid

This Gallery document will eventually supplant the [Smartdown on Solid](https://smartdown.solid.community/public/smartdown/) content at [smartdown.solid.community](https://smartdown.solid.community/public/).

This document currently contains just a few examples of using Solid from Smartdown, and using the [solid-react-sdk](https://github.com/inrupt/solid-react-sdk).


#### Simple example using LDFlex

This example will use the LDFlex library directly to perform some queries against various Solid user profiles. There will be some Smartdown buttons and cells to reflect the current target profile URI, and then some output cells to display the information gathered via LDFlex.

---

```javascript /playable/autoplay
//smartdown.import=https://cdn.jsdelivr.net/npm/solid-auth-client/dist-lib/solid-auth-client.bundle.js
//smartdown.import=https://cdn.jsdelivr.net/npm/@solid/query-ldflex@2.7.0/dist/solid-query-ldflex.bundle.js

smartdown.setVariable('person', 'https://doctorbud.solid.community/profile/card#me');
smartdown.setVariable('current', 'NotLoggedInToSolid');

// if (typeof solid.data.user !== 'undefined') {
//   try {
//     const current = `${await solid.data.user}`;
//     smartdown.setVariable('current', current);
//   }
//   catch (e) {
//     console.log(e);
//   }
// }


this.dependOn = ['person'];
this.depend = async function() {
  let personId = env.person;
  smartdown.setVariables([
    {lhs: 'firstName', rhs: '', type: 'string'},
    {lhs: 'friends', rhs: undefined},
    {lhs: 'blogPosts', rhs: undefined},
  ]);


  if (personId === 'NotLoggedInToSolid') {
    return;
  }
  const person = solid.data[personId];
  const firstName = `${await person.vcard_fn}`;
  smartdown.setVariable('firstName', firstName);

  const friends = [];
  for await (const friend of person.friends) {
    friends.push(
    {
      uri: `${await friend}`,
      firstName: `${await friend.firstName}`,
      lastName: `${await friend.lastName}`,
    });
  }
  smartdown.setVariable('friends', friends, 'json');

  const blogPostsQuery = person.blog['schema:blogPost'];
  const blogPosts = [];
  for await (const blogPostQuery of blogPostsQuery) {
    blogPosts.push({
      uri: `${await blogPostQuery}`,
      label: `${await blogPostQuery.label}`,
    });
  }
  smartdown.setVariable('blogPosts', blogPosts, 'json');
};
```


##### Specifying the target profile URI

[person](:?person|text)

[DoctorBud](:=person='https://doctorbud.solid.community/profile/card#me')
[Ruben Verborgh](:=person='https://ruben.verborgh.org/profile/#me')
[`current`](:=person=current)

##### The Data returned from LDFlex

[firstName](:!firstName)
[friends](:!friends)
[blogPosts](:!blogPosts)




#### Example of using solid-react-components

We'll take advantage of Smartdown's `/react` extension to deal with JSX and the loading of the React libraries, but we'll explicitly load the Solid libraries, because there is not (yet?) a Smartdown extension. We'll explicitly import [solid-react-components](https://github.com/solid/react-components) and [solid-auth-client]() and [solid-query-ldflex]().


---

```javascript /react/playable/autoplay/debug
//smartdown.import=https://cdn.jsdelivr.net/npm/solid-auth-client/dist-lib/solid-auth-client.bundle.js
//smartdown.import=https://cdn.jsdelivr.net/npm/@solid/query-ldflex@2.7.0/dist/solid-query-ldflex.bundle.js
//smartdown.import=https://unpkg.com/@solid/react@1.8.0/dist/solid-react.js


const innerDivId = this.div.id + '_inner';
this.div.innerHTML = `<div id="${innerDivId}"></div>`;

function Demo() {
  const popupPath = 'https://solid.community/common/popup.html';
  return (
    <div>
<solid.react.LoggedOut>
  <p>You are not logged in, and this is a members-only area!</p>
  <solid.react.LoginButton popup={popupPath}/>
</solid.react.LoggedOut>


<solid.react.LoggedIn>
  <p>You are logged in and can see the special content.</p>
  <solid.react.List src="[https://doctorbud.solid.community/profile/card#me].friends.firstName"/>
  <solid.react.LogoutButton/>
</solid.react.LoggedIn>
    </div>
  );
}

const domContainer = document.getElementById(innerDivId);
const component = ReactDOM.render(React.createElement(Demo), domContainer);

```



[Back to Home](:@Home)
