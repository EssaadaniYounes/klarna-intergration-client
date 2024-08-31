# Klarna's Checkout

Klarna's Checkout Is UI for handling the checkout using the klarna gateway Integrated with a Laravel API.

## Requirements
`nodejs > 18.0v` \
`npm > 10v` 

## Installation

- Clone the project

```bash
https://github.com/EssaadaniYounes/klarna-intergration-client.git
```
- Install  packages
```bash
npm install
```
- Create .env file and copy the content of the .env.example into it
```bash
cp .env.example .env
```
Replace the `VITE_API_URL` with the API implemenation\
you can find the repository here 
[API](https://github.com/EssaadaniYounes/klarna-s-integration).
## Running the App
Run the following command to run the application
```bash
npm run dev
```
## Testing
Visit [http://localhost:5173/](http://localhost:5173/) \
then press on view button in any product, It should redirect you to a page to view product details. And a button labelled `Buy now` press on it a drawer should open you press on `buy with klarna` wait for some seconds and a klarna checkout form will appear fill it and congrats your checkout is done. and a email will arrive to your inbox telling you about the checkout status.
