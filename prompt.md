# Build Your Own wc Tool
This challenge is to build your own version of the Unix command line tool wc!
The Unix command line tools are a great metaphor for good software engineering and they follow the Unix Philosophies of:
* Writing simple parts connected by clean interfaces - each tool does just one thing and provides a simple CLI that handles text input from either files or file streams.
* Design programs to be connected to other programs - each tool can be easily connected to other tools to create incredibly powerful compositions.
Following these philosophies has made the simple unix command line tools some of the most widely used software engineering tools - allowing us to create very complex text data processing pipelines from simple command line tools.

Here are the outputs expected:

`ccwc -c` outputs the number of bytes in a file:

```
>ccwc -c test.txt
  342190 test.txt
```

`ccwc -l` outputs the number of lines in a file:


```
>ccwc -l test.txt
    7145 test.txt
```

`ccwc -w` outputs the number of words in a file:


```
>ccwc -w test.txt
   58164 test.txt
```

`ccwc -c` outputs the number of characters in a file:


```
>ccwc -m test.txt
  339292 test.txt
```

`ccwc` with no options performs a default behaviour, which is equivalent to the flags `-c` `-l` and `-w` flags:


```
>ccwc test.txt
    7145   58164  342190 test.txt
```

Build the code with tests using Typescript.
