const HowItWorks = () => {
    return (
        <section className="bg-gray-100 py-12 pb-16">
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="250" className="container mx-auto text-center">
                <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
                <h2 className="text-4xl font-bold text-customBlue mb-10"><span className='text-customGulabi'>How</span> It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded shadow hover:bg-drop-shadow-xl text-white bg-customBlue">
                        <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up</h3>
                        <p>Create an account by providing your basic details. It is quick and easy.</p>
                    </div>
                    <div className="p-6 border rounded shadow hover:drop-shadow-xl text-white bg-customGulabi">
                        <h3 className="text-xl font-semibold mb-2">Step 2: Complete Profile</h3>
                        <p>Fill out your biodata with accurate information to attract suitable matches.</p>
                    </div>
                    <div className="p-6 border rounded shadow hover:drop-shadow-xl text-white bg-customBlue">
                        <h3 className="text-xl font-semibold mb-2">Step 3: Search & Connect</h3>
                        <p>Use our advanced search filters to find and connect with potential matches.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
