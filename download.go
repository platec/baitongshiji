package main

import (
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"
	"time"
)

func readFile() string {
	f, err :=os.Open("百通世纪.txt")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	out,err := ioutil.ReadAll(f)
	return string(out)
}


func main() {
	folderName := "pptx"
	_, err := os.Stat(folderName)
	if err == nil {
		os.RemoveAll(folderName)
	}
	time.Sleep(time.Duration(time.Second * 1))
	os.Mkdir(folderName, os.ModePerm)

	text := readFile()
	urls := strings.Split(text, ",")
	for idx, url := range urls{
		println(strconv.Itoa(idx) + ".jpg", url)
		resp, _ := http.Get(url)
		img, _ := os.Create(path.Join(folderName, strconv.Itoa(idx) + ".jpg"))
		io.Copy(img, resp.Body)
	}
}