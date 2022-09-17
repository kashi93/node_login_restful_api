# Node Login Restful API
## Table of contents

- [Node Login Restful API](#node-login-restful-api)
  - [Table of contents](#table-of-contents)
  - [Command setup](#command-setup)
  - [Route List](#route-list)
  - [License](#license)



## Command setup

1) Clone the repo and install the dependencies.
2) Setup your mysql database (PHPMYADMIN or ETC)
3) Create .env file on root project and copy content from .env.example 
4) Link your created database to .env
5) Run below command using terminal


```console
$ node vendor/command migrate
```

```console
$ npm run start
```

6) Test with Postman with body x-www-form-urlencoded

## Route List

```console
$ /register
```

```console
$ /login
```


```console
$ /auth-user
```

## License

Node.js is available under the
[MIT license](https://opensource.org/licenses/MIT). Node.js also includes
external libraries that are available under a variety of licenses.  See
[LICENSE](https://github.com/nodejs/node/blob/HEAD/LICENSE) for the full
license text.

[Code of Conduct]: https://github.com/nodejs/admin/blob/HEAD/CODE_OF_CONDUCT.md
[Contributing to the project]: CONTRIBUTING.md
[Node.js website]: https://nodejs.org/
[OpenJS Foundation]: https://openjsf.org/
[Strategic initiatives]: doc/contributing/strategic-initiatives.md
[Technical values and prioritization]: doc/contributing/technical-values.md
[Working Groups]: https://github.com/nodejs/TSC/blob/HEAD/WORKING_GROUPS.md
