plugins {
	java
	id("org.springframework.boot") version "3.2.5" // Example version, adjust as needed for Java 24 compatibility
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.jo"
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
	implementation("commons-net:commons-net:3.10.0") // Apache Commons Net for FTP
	// implementation("org.springframework.boot:spring-boot-starter-security")
	
	// JWT dependencies
	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5") // For JSON processing with Jackson

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
