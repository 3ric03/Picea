# Software Architecture 
<img src="https://github.com/3ric03/Picea/blob/main/arch.png" width="600px" height="300px">

# What it does
Picea is a proof of concept cloud-based resource that provides mental health support and is available to UofT students. It provides mental health support for all students by allowing them to join video conferencing sessions with professional counsellors. The application provides an availability schedule for all counsellors, to cater to the student's time of availability. Within a conference, students and counsellors are able to meet online face-to-face and can communicate by sharing files with each other.

# How we built it
We built our application using a Javascript backend and frontend architecture that is enabled by many AWS resources including: AWS Lambda, AWS S3, AWS Chime SDK, DynamoDB. AWS Lambda enables our application be serverless. AWS Chime is the underlying framework that enables our video conferencing feature between both the student and the counsellor. We used AWS S3 to store chat and file sharing data between the student and counsellor. DynamoDB enables us to store participant and meeting data.

# What's next for Picea
We believe that Picea's next steps involve more features and functionalities that can enrich the student's experience with our application and improve scalability.

As Picea becomes more popular, we must consider the amount of traffic on our service and be able to handle students who may schedule with the same counsellor on the same timeslot.

We can also introduce a login functionality, preferrably with the student's UTORid and password so students are able to login and have more advanced functionalities, i.e. saving a schedule for weekly events with the same counsellor.
