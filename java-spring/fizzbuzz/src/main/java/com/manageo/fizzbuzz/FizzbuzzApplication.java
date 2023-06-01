package com.manageo.fizzbuzz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class FizzbuzzApplication {

	public static void main(String[] args) {
		SpringApplication.run(FizzbuzzApplication.class, args);
	}

	@GetMapping(value = "/api/{input}")
	public ResponseEntity<?> apiRoot(@PathVariable String input) {
		try {
			List<String> results = fizzBuzz(Integer.parseInt(input));
			if(results.isEmpty())
				return new ResponseEntity<String>("La liste ne contient aucun chiffre.", HttpStatus.NO_CONTENT);
			return new ResponseEntity<List<String>>(results, HttpStatus.OK);
		} catch (NumberFormatException e) {
			return new ResponseEntity<String>("Veuillez entrer un nombre entier valide.", HttpStatus.BAD_REQUEST);
		}
	}

	private static List<String> fizzBuzz(int n) {
		List<String> results = new ArrayList<>();

		for(int i = 1; i<=n; i++) {
			if(i%3 == 0 && i%5 == 0) {
				results.add("FizzBuzz");
			}
			else if(i%3 == 0) {
				results.add("Fizz");
			}
			else if(i%5 == 0) {
				results.add("Buzz");
			}
			else {
				results.add(String.valueOf(i));
			}
		}
		return results;
	}
}
