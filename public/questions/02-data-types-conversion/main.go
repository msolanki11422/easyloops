package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var scanner *bufio.Scanner

	scanner = bufio.NewScanner(os.Stdin)

	scanner.Scan()
	line := scanner.Text()

	fmt.Printf("String to int: %s\n", line)

	scanner.Scan()
	line = scanner.Text()
	float, _ := strconv.ParseFloat(line, 64)
	fmt.Printf("String to float: %.2f\n", float)

	scanner.Scan()
	line = scanner.Text()
	boolVal, _ := strconv.ParseBool(line)

	fmt.Printf("String to bool: %t\n", boolVal)

	scanner.Scan()
	line = scanner.Text()
	integer, _ := strconv.ParseInt(line, 10, 64)
	line = strconv.FormatInt(integer, 10)
	fmt.Printf("Int to string: %s\n", line)

	fmt.Printf("Int to float: %.1f\n", float64(integer))

	boolVal = integer != 0
	fmt.Printf("Int to bool: %t\n", boolVal)

	scanner.Scan()
	line = strings.TrimSpace(scanner.Text())
	float, _ = strconv.ParseFloat(line, 64)

	line = strconv.FormatFloat(float, 'f', 5, 64)
	fmt.Printf("Float to string: %s\n", line)

	scanner.Scan()
	line = scanner.Text()
	fmt.Printf("Float to int: %d\n", int(float))

	scanner.Scan()
	line = scanner.Text()
	boolVal = float != 0
	fmt.Printf("Float to bool: %t", boolVal)
}
