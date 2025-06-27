/**
 * [QUESTION_TITLE] - Go Solution
 * [QUESTION_DESCRIPTION]
 *
 * Author: [AUTHOR_NAME]
 * Date: [DATE]
 * Language: Go
 *
 * The program reads input from stdin and writes output to stdout.
 * You only need to implement the solve() function below.
 */

package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

/**
 * TODO: Implement your solution here.
 *
 * This is the main function you need to complete.
 * Use the provided scanner to read input and fmt.Println() to write output.
 *
 * Example usage:
 *     scanner.Scan()
 *     line := scanner.Text()                    // Read a line
 *
 *     scanner.Scan()
 *     n, _ := strconv.Atoi(scanner.Text())      // Read an integer
 *
 *     scanner.Scan()
 *     parts := strings.Fields(scanner.Text())   // Read space-separated words
 *
 *     fmt.Println(result)                       // Print your result
 */
func solve() {
	scanner.Scan()
	line := strings.TrimSpace(scanner.Text())
	firstNum, _ := strconv.Atoi(line)

	scanner.Scan()
	line = strings.TrimSpace(scanner.Text())
	secondNum, _ := strconv.Atoi(line)

	fmt.Printf("Addition: %d + %d = %d\n", firstNum, secondNum, (firstNum + secondNum))
	fmt.Printf("Subtraction: %d - %d = %d\n", firstNum, secondNum, (firstNum - secondNum))
	fmt.Printf("Multiplication: %d * %d = %d\n", firstNum, secondNum, (firstNum * secondNum))
	fmt.Printf("Division: %d / %d = %.2f\n", firstNum, secondNum, (float32(firstNum) / float32(secondNum)))
	fmt.Printf("Modulus: %d %% %d = %d\n", firstNum, secondNum, (firstNum % secondNum))
	fmt.Printf("Exponentiation: %d ** %d = %.0f", firstNum, secondNum, math.Pow(float64(firstNum), float64(secondNum)))
}

// Add any helper functions you need below this line

var scanner *bufio.Scanner

func main() {
	scanner = bufio.NewScanner(os.Stdin)
	solve()
}
