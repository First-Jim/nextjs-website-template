import Document, { Html, Head, Main, NextScript } from "next/document";

const CADHead = () => {
  return <Head></Head>;
};

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <title>next - document</title>
        <CADHead />
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
