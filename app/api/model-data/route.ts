



// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   try {
//     const { posts_data, comments_data, users_data } = await req.json()

//     console.log(posts_data)
//     console.log(comments_data)
//     console.log(users_data)

//     // Validate the incoming data
//     if (!posts_data || !comments_data || !users_data) {
//       return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
//     }

//     // Process the data (this is where you'd typically save to a database or perform other operations)
//     // const processedData = {
//     //   total_posts: Object.keys(posts_data).length,
//     //   total_comments: Object.values(comments_data).reduce((acc, post) => acc + Object.keys(post).length, 0),
//     //   total_users: Object.keys(users_data).length,
//     // }

//     // // Log some information about the received data
//     // console.log('Received data:', {
//     //   posts: processedData.total_posts,
//     //   comments: processedData.total_comments,
//     //   users: processedData.total_users,
//     // })

//     // Return a success response
//     return NextResponse.json({
//       message: 'Data received and processed successfully',
//       hash: 'hash',
//     //   summary: processedData,
//     }, { status: 200 })

//   } catch (error) {
//     console.error('Error processing data:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }



import { NextResponse } from 'next/server';
import lighthouse from '@lighthouse-web3/sdk';

// Configuration
const LIGHTHOUSE_API_KEY = '892af536.0dcf6a9b415e4d1c9497e8912d53274d';

export async function POST(req: Request) {
  try {
    // 1. Get and validate the data
    const { posts_data, comments_data, users_data } = await req.json();

    // Validate the incoming data
    if (!posts_data || !comments_data || !users_data) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // 2. Prepare the data for upload
    const dataToUpload = {
      posts_data,
      comments_data,
      users_data,
      timestamp: new Date().toISOString(),
    };

    // Convert to string for upload
    const jsonString = JSON.stringify(dataToUpload, null, 2);

    // 3. Upload to Lighthouse
    try {
      const response = await lighthouse.uploadText(
        jsonString,
        LIGHTHOUSE_API_KEY,
        'data-upload'  // name for the upload
      );

      // 4. Process the upload response
      if (response && response.data && response.data.Hash) {
        
        // Return success response with the hash
        return NextResponse.json({
          message: 'Data received and uploaded to Lighthouse successfully',
          hash: response.data.Hash,
          timestamp: dataToUpload.timestamp
        }, { status: 200 });
      } else {
        throw new Error('Invalid response from Lighthouse');
      }
    } catch (uploadError) {
      console.error('Lighthouse upload error:', uploadError);
      return NextResponse.json({
        error: 'Failed to upload to Lighthouse',
        // details: uploadError.message
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
    //   details: error.message 
    }, { status: 500 });
  }
}
