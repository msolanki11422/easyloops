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
	"os"
	"strconv"
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
	line := scanner.Text()

	numFromLineOne, _ := strconv.Atoi(line)
	fmt.Println("Integer variable:", numFromLineOne)

	scanner.Scan()
	line = scanner.Text()
	fmt.Println("String variable:", line)

	scanner.Scan()
	line = scanner.Text()
	boolFromLineThree, _ := strconv.ParseBool(line)
	fmt.Println("Boolean variable:", boolFromLineThree)

	scanner.Scan()
	line = scanner.Text()
	floatFromLineFour, _ := strconv.ParseFloat(line, 64)
	fmt.Printf("Float variable: %.3f\n", floatFromLineFour)

	scanner.Scan()
	line = scanner.Text()
	runes := []rune(line)
	fmt.Printf("Character variable: %c\n", runes[0])

	scanner.Scan()
	line = scanner.Text()
	newIntegerFromLineFive, _ := strconv.Atoi(line)
	numFromLineOne = newIntegerFromLineFive
	fmt.Printf("Updated integer variable: %d\n", numFromLineOne)

	scanner.Scan()
	line = scanner.Text()
	fmt.Printf("Late-initialized variable: %s", line)

}

// Add any helper functions you need below this line

var scanner *bufio.Scanner

func main() {
	scanner = bufio.NewScanner(os.Stdin)
	solve()
}
