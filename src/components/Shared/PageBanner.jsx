import Container from "./Container";

// eslint-disable-next-line react/prop-types
const PageBanner = ({ title, subtitle }) => {
  return (
    <div className="bg-gray-900 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageBanner;
