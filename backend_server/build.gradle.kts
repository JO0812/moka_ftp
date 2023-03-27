plugins {
	java
	id("org.springframework.boot") version "3.2.5" // Example version, adjust as needed for Java 24 compatibility
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_21 // Or JavaVersion.valueOf("24") if your Gradle supports it and Spring Boot has full compatibility.
	// Java 21 is the latest LTS. Java 24 is a non-LTS.
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	// Add other dependencies as needed, e.g., for FTP, security
	// implementation("commons-net:commons-net:3.9.0") // Example for Apache Commons Net FTP
	// implementation("org.springframework.boot:spring-boot-starter-security")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
