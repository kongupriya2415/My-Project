import axios from 'axios'
export async function getAllSlickImages() {
    const response = await fetch('http://localhost:5000/route/slick', {
      method: 'get',
    });
    console.log('Response', response);
    if (response.status == 200) {
      return await response.json();
    } else if (response.status == 400) {
      var errorResponse = await response.json();
      throw new Error(errorResponse.error); 
    }
    {
      return response.json();
    }
}
export async function register( email,password,gender) {
  try {
    const response = await fetch('http://localhost:5000/route/registerdetails', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email,
        password:password,
        gender :gender
       
      }),
      
    }) .then(response => {
      localStorage.setItem('Token', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
  } catch (e) {
    throw e;
  }
}




export const login = (email,password) => {
  return axios
    .post('http://localhost:5000/route/login', {
      email: email,
      password: password
    })
    .then(response => {
      localStorage.setItem('Token', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}





export async function editProfile(requestBody) {
  try {
    const token = localStorage.getItem('Token');
    console.log(`Token ${token}`);
    const response = await fetch('http://localhost:5000/route/editProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400 || 404 || 401) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 500) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    console.log('updateOrganization Response', response);
    {
      return response;
    }

  } catch (e) {
    throw e;
  }
}




export async function Profile() {
  try {
    const token = localStorage.getItem('Token');
    console.log(`Token ${token}`);
    const response = await fetch(
      'http://localhost:5000/route/profile',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    console.log('getSettings Response', response);
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400 || 422) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 401) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 500 || 504) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    console.log('getSettings-Response', response);
    {
      return response;
    }
  } catch (e) {
    throw e;
  }
}



// Gallery--------------------------------
export async function getAllGalleryImages() {
  const response = await fetch('http://localhost:5000/route/getGalleryImage', {
    method: 'get',
  });
  console.log('Response', response);
  if (response.status == 200) {
    return await response.json();
  } else if (response.status == 400) {
    var errorResponse = await response.json();
    throw new Error(errorResponse.error); 
  }
  {
    return response.json();
  }
}







































export async function signIn(email, password) {
  try {
    const response = await fetch('http://localhost:5000/route/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log('Login-Response', response);
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400 || 422) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 401) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 500 || 504) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    console.log('Login-Response', response);
    {
      return response;
    }
  } catch (e) {
    throw e;
  }
}

export async function signUp(firstName, lastName, phone, userName, email, password, bio) {
  try {
    const response = await fetch('http://localhost:5000/route/registerdetails', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName :firstName,
        lastName : lastName,
        phone :phone,
        userName: userName,
        email: email,
        password: password,
        bio: bio
      }),
    });
    console.log('signIn-Response', response);
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400 || 422) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 401) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 504) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    console.log('signIn-Response', response);
    {
      return response;
    }

  } catch (e) {
    throw e;
  }
}



export async function getAllNewsFeed() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/v1/getallpost', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    console.log('Response', response);
    if (response.status == 200) {
      return await response.json();
    } else if (response.status == 400) {
      var errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    {
      return response;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}



export async function addPost(requestBody) {
  try {
    const token = localStorage.getItem('token');
    console.log(`Token ${token}`);
    const response = await fetch('/v1/createpost', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 401) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    } else if (response.status === 500 || 504) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    console.log('AddPost Response', response);
    {
      return response;
    }

  } catch (e) {
    throw e;
  }
}





















