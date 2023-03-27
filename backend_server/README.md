# Backend Server for Moka FTP

This directory contains the Java Spring Boot backend application.

## Getting Started

1.  **Prerequisites:**
    *   Java JDK (Version 21+ recommended, configured for Java 24 as per your request, ensure compatibility with Spring Boot version).
    *   Gradle (or Maven, if you switch `build.gradle.kts` to `pom.xml`).

2.  **Build the Application:**
    ```bash
    ./gradlew build
    ```

3.  **Run the Application:**
    ```bash
    ./gradlew bootRun
    # or directly via java -jar after building
    # java -jar build/libs/moka_ftp-0.0.1-SNAPSHOT.jar
    ```
    The server will typically start on `http://localhost:8080`.

## Project Structure

-   `build.gradle.kts`: Gradle build configuration.
-   `src/main/java/com/example/moka_ftp/`: Main application Java source code.
    -   `MokaFtpApplication.java`: Spring Boot main class.
    -   `controller/`: API request handlers.
    -   `service/`: Business logic layer.
    -   `repository/`: Data access interfaces.
    -   `infrastructure/`: Concrete implementations (e.g., FTP client).
    -   `dto/`: Data Transfer Objects (you'll need to create these).
    -   `config/`: Spring configurations (you can create this).
-   `src/main/resources/`: Application resources.
    -   `application.properties`: Configuration properties.

## API Endpoints (Examples)

-   `POST /api/auth/login`: Placeholder for user login.

(Further details on API design and FTP operations will be based on your `Roadmap.md`.)
