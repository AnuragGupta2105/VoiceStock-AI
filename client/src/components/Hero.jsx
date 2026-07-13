import "../styles/hero.css";

function Hero() {

  const startShopping = () => {

    document
      .getElementById("voice-shopping")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };

  return (

    <section id="hero" className="hero">

      {/* LEFT */}

      <div className="hero-left">

        <span className="hero-tag">

          🚀 AI Powered Shopping Assistant

        </span>

        <h1>

          Shop Smarter.
          <br />
          Shop Faster.
          <br />
          With Your Voice.

        </h1>

        <p>

          Experience a smarter way of grocery shopping using
          natural voice commands, AI-powered recommendations,
          intelligent shopping insights and real-time list
          management.

        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={startShopping}
          >

            🛒 Start Shopping

          </button>
        </div>  

        <div className="hero-features">

          <div className="feature-box">

            🎤

            <span>

              Voice Shopping

            </span>

          </div>

          <div className="feature-box">

            🤖

            <span>

              AI Suggestions

            </span>

          </div>

          <div className="feature-box">

            ⚡

            <span>

              Smart Insights

            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="hero-right">

        <div className="preview-card">

          {/* Header */}

          <div className="preview-top">

            <div className="live">

              🟢 LIVE

            </div>

            <strong>

              VoiceStock AI

            </strong>

          </div>

          {/* Voice Command */}

          <div className="preview-command">

            🎤

            "Need breakfast items"

          </div>

          {/* Products */}

          <div className="preview-products">

            <div className="preview-item">

              <div>

                🥛 Milk

              </div>

              <strong>

                ₹65

              </strong>

            </div>

            <div className="preview-item">

              <div>

                🍞 Bread

              </div>

              <strong>

                ₹45

              </strong>

            </div>

            <div className="preview-item">

              <div>

                🥚 Eggs

              </div>

              <strong>

                ₹96

              </strong>

            </div>

            <div className="preview-item">

              <div>

                🧈 Butter

              </div>

              <strong>

                ₹58

              </strong>

            </div>

          </div>

          {/* Progress */}

          <div className="shopping-progress">

            <div className="progress-text">

              Shopping Progress

              <span>

                80%

              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
              ></div>

            </div>

          </div>

          {/* Footer */}

          <div className="preview-footer">

            <div>

              <small>

                Estimated Total

              </small>

              <h2>

                ₹264

              </h2>

            </div>

            <button>

              Checkout

            </button>

          </div>

          {/* AI Suggestion */}

          <div className="ai-tip">

            💡

            AI recommends adding
            <strong>

              Fruits

            </strong>

            to save more on delivery.

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;