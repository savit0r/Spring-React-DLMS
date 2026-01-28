$courses = @(
    @{
        courseId = 101
        title = "Complete Web Development Bootcamp"
        description = "Learn Web Development from A to Z with this comprehensive bootcamp course. Covers HTML, CSS, JavaScript, React, Node.js, and more."
        instructor = "Angela Yu"
        modules = @(
            @{ title = "Introduction to HTML"; lessons = @( @{ title = "HTML Basics"; type = "VIDEO"; mediaId = "QmExamples" } ) }
        )
    },
    @{
        courseId = 102
        title = "Machine Learning A-Z: Hands-On Python & R"
        description = "Create Machine Learning Algorithms in Python and R from two Data Science experts. Includes templates."
        instructor = "Kirill Eremenko"
        modules = @(
            @{ title = "Data Preprocessing"; lessons = @( @{ title = "Getting Started"; type = "VIDEO"; mediaId = "QmExamples" } ) }
        )
    },
    @{
        courseId = 103
        title = "The Complete Digital Marketing Course"
        description = "Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!"
        instructor = "Rob Percival"
        modules = @(
            @{ title = "SEO"; lessons = @( @{ title = "SEO Basics"; type = "PDF"; mediaId = "QmExamples" } ) }
        )
    },
    @{
        courseId = 104
        title = "React - The Complete Guide (incl Hooks, React Router, Redux)"
        description = "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!"
        instructor = "Maximilian Schwarzmüller"
        modules = @(
            @{ title = "React Basics"; lessons = @( @{ title = "Components"; type = "VIDEO"; mediaId = "QmExamples" } ) }
        )
    },
    @{
        courseId = 105
        title = "Flutter & Dart - The Complete Guide [2024 Edition]"
        description = "A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps."
        instructor = "Academind"
        modules = @(
            @{ title = "Dart Basics"; lessons = @( @{ title = "Variables"; type = "VIDEO"; mediaId = "QmExamples" } ) }
        )
    }
)

foreach ($course in $courses) {
    $body = $course | ConvertTo-Json -Depth 4
    echo "Creating course: $($course.title)"
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8081/api/courses" -Method Post -Body $body -ContentType "application/json"
        echo "Success: Created Course ID $($response.courseId)"
    } catch {
        echo "Error creating $($course.title): $_"
    }
}
