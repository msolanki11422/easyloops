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

	integer, _ := strconv.Atoi(line)
	float := float64(integer)

	fmt.Printf("Integer: %d\n", integer)
	fmt.Printf("Integer to float: %.1f\n", float)

	scanner.Scan()
	line = scanner.Text()
	float, _ = strconv.ParseFloat(line, 64)
	integer = int(float)

	fmt.Printf("Float: %.4f\n", float)
	fmt.Printf("Float to integer: %d\n", integer)

	scanner.Scan()
	line = scanner.Text()
	anotherInteger, _ := strconv.ParseInt(line, 10, 64)

	fmt.Printf("String: %s\n", strings.TrimSpace(line))
	fmt.Printf("String to integer: %d\n", anotherInteger)

}
