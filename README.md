# Inspiration
As students ourselves, we understand the stresses of school and how it takes a toll on mental health. All students have to balance large workloads including, exams, extracurriculars, job search or other challenges that can have a serious impact on their mental health. Mental health has often been an overlooked subject so we believe we can create a solution that would have a lasting impact that caters to all students needs.

# What it does
Picea is a free cloud-based resource that provides mental health support and is available to all UofT students. It provides mental health support for all students by allowing them to join video conferencing sessions with professional counsellors. The application provides an availability schedule for all counsellors, to cater to the student's time of availability. Within a conference, students and counsellors are able to meet online face-to-face and can communicate by sharing files with each other.

# How we built it
We built our application using a Javascript backend and frontend architecture that is enabled by many AWS resources including: AWS Lambda, AWS S3, AWS Chime SDK, DynamoDB. AWS Lambda enables our application be serverless. AWS Chime is the underlying framework that enables our video conferencing feature between both the student and the counsellor. We used AWS S3 to store chat and file sharing data between the student and counsellor. DynamoDB enables us to store participant and meeting data.

# Challenges we ran into
It was challenging to navigate the different complexities and dependencies of web software. For example, we have an upload functionality that sends files from the user to Amazon S3. However, we were consistently getting 403 errors during the upload processes. Later we found out this was because CORS was not enabled in our http calls, causing the upload to be blocked.

Another challenge we experienced is working with the Endpoint APIs. There are a lot of layers of complexity when using these endpoints and we had to navigate through a variety of different errors.

# Accomplishments that we're proud of
We are proud of the progress we’ve made with this project considering it is our first time using a cloud computing service. We were able to find the relevant documentation and learn the basics of the AWS functionalities we needed rather quickly. We also didn’t have a lot of prior experience with Javascript, which is the primary coding language of our project. Once again, we were able to learn the relevant technical details rather quickly to complete a prototype of our project.

# What we learned
We learned a lot about how to integrate AWS into the backend of our web application. This includes communicating with DynamoDB to fetch and modify information from our database. We also learned how to communicate between the front-end and back-end of our application using AWS API Endpoints. Additionally, we discovered how to use AWS Chime SDK to host our video-conferencing functionalities.

# What's next for Picea
We believe that Picea's next steps involve more features and functionalities that can enrich the student's experience with our application and improve scalability.

As Picea becomes more popular, we must consider the amount of traffic on our service and be able to handle students who may schedule with the same counsellor on the same timeslot.

We can also introduce a login functionality, preferrably with the student's UTORid and password so students are able to login and have more advanced functionalities, i.e. saving a schedule for weekly events with the same counsellor.
