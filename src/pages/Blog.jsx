import React from "react";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <div className="max-w-full ">
        <div className="mb-16 mt-7">
          <div className="flex justify-between mx-56">
            <div>
              <img src="" alt="" />
              <h4 className="font-light">By Remy Sharp 31-jan,2018</h4>
            </div>
            <div className="flex">
              <h1 className="font-bold hover:text-blue-600">Subscribe</h1>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-[50%] items-center justify-center mx-80 my-10 text-[15px] ">
            <div className=" my-12 w-full">
              <h1 className="text-3xl font-bold">
                The Return and The Refactor
              </h1>
            </div>
            <div className="text-gray-600 text-sm">
              <div className="flex mb-8 ">
                <p>
                  Hello there dear reader. Remember me? 😃 It’s been almost 2
                  years since the last blog post and I can imagine it has felt
                  like JS Bin has been the same for a little while now.
                </p>
              </div>

              <div className="flex mb-8">
                <p>
                  The issue tracker was building up (a high of over 650 open
                  issues) and various server problems have continued to roll in.
                  The height of which was a notification from Amazon (where JS
                  Bin hosts on AWS), telling me the server JS Bin runs on, will
                  be terminated and removed from usage in 7 days! 😱
                </p>
              </div>

              <div className="flex mb-8">
                <p>
                  That last issue prompted a “quick” upgrade from node 0.10 to
                  node 4, and then node 7. Which then triggered a cascade of
                  problems to which eventually I threw my toys out of the pram
                  and decided it was time to return to simpler times.
                </p>
              </div>

              <div className="flex mb-8">
                <p>
                  I started, from scratch, to write a new JS Bin. The first
                  (working, but utterly limited) version was this:
                </p>
              </div>
            </div>
          </div>
          <div className="w-[50%] mx-80">
            <img
              src="https://help.jsbin.com/images/blog/early-v5.png"
              alt="error"
              className=""
            />
          </div>
        </div>
        <div className="flex w-[50%] mx-80 text-gray-600 text-[15px] text-sm">
          <p>
            In fact, this isn’t much of a departure from the original, v1 of JS
            Bin from back in 2008 (sure, it’s less orange though!):
          </p>
        </div>
        <div className="w-[50%] mx-80 my-6">
          <img src="https://help.jsbin.com/images/blog/v1.jpg" alt="" />
        </div>
        <div className="flex w-[50%] mx-80 text-gray-600 text-sm ">
          <p>
            So, I’ve been working on this new refactor since July 2017 on and
            off between “real” paid work and making slow progress. The current
            alpha version of JS Bin v5 is quite a decent way along, thought
            there’s still lots to do, there’s quite a few nice toys tucked
            inside new JS Bin too. Here’s one to whet your appetite:
          </p>
        </div>
        <div className="ml-48 my-10">
          <iframe
            id="iframe"
            className="w-[40%] h-[calc(100vh-4rem)] bg-[#fff] text-black border border-y-gray-500-500"
            title="output"
            src="https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&frame=false&hideCard=false&hideThread=false&id=956508538184052736&lang=en&origin=https%3A%2F%2Fjsbin.com%2F%2Fblog%2Fthe-return-and-the-refactor%2F&sessionId=bc235d903f60aae6459348c00a6d488bf96d61b2&theme=light&widgetsVersion=2615f7e52b7e0%3A1702314776716&width=550px"
            frameBorder="0"
            style={{ overflow: "hidden" }} // Hides scrollbars and border
            scrolling="no" // Prevents iframe from showing scrollbars
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mx-80 w-[50%] text-gray-600 text-sm ">
          <h1 className="font-bold text-2xl my-5">What does this mean?</h1>
          <p>
            It means there’s going to be a new, streamlined, modern JS Bin
            available soon. Just as importantly, all of the legacy code will be
            dispatched and the new code based entirely on modern development
            practises.
          </p>

          <p className="my-5">
            The biggest driver for the refactor is the constant downtime that JS
            Bin suffers for various reasons. This new, v5, version will run from
            entirely static content served over a CDN. It will have minimal
            reliance on online servers so the webapp aims to be fully offline
            capable.
          </p>

          <p className="my-5">
            There will be a number of features that will be dropped, and there
            will be some functionality yet to be written (for instance, mobile
            support is great on current JS Bin, but terrible in v5).
          </p>

          <p>
            The aim: back to simple. Simple and fast is what JS Bin was good at.
            Now I want to add reliable to those principles.
          </p>
        </div>

        <div className="mt-5 mx-80">
          <h1 className="text-2xl font-bold text-gray-600">
            Can you try it out?
          </h1>
          <p className="my-3">
            Why yes, you can! And, if you don’t like it, you can always “eject”
            back to JS Bin v4 (from the palette menu).
          </p>
        </div>
        <div className=" mx-[500px]">
          <button className="bg-yellow-300 p-3 px-8 items-center 1 border-r  border-b-2 border-zinc-800">
            Try JS Bin v5-alpha now
          </button>
        </div>
        <div className="w-[50%] mx-80 text-sm text-gray-600 mt-10 mb-10">
        <p className="my-5">
          Keep in mind that v5 is still in alpha, and there will be some
          undocumented parts, some broken parts, some missing parts. If you feel
          there’s something important or unobvious that’s going wrong, there’s a
          dedicated support link in v5 that you file an issue.
        </p>
        <p>
          Thanks for reading, and I’ll be in touch again with updates the
          progress of v5 development.
        </p>
        </div>

        <div className="border-4 border-yellow-400 p-6 mx-auto w-2/5 pt-7 mb-10">
          <h1 className="text-xl font-bold mb-4">❤️Love JS Bin?</h1>
          <a
            href="https://opencollective.com/jsbin/contribute"
            className="underline underline-offset-2 text-blue-600 hover:text-[rgb(89,87,209)]"
          >
            Support this open source project today,
          </a>
          <span className="block mt-2 text-gray-600">
            and help it continue to run for <i>another</i> decade 🎂
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
