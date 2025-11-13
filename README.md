# CrowdControl

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/release/python-380/)

**This project is a submission for the INNOVEX 24-Hour National-Level Hackathon, addressing Problem Statement 1: The Eye of Indra (इंद्र-नेत्र) - Prevent Stampedes & Smart Crowd Safety.**

CrowdControl is a real-time crowd monitoring and stampede prediction system. It uses a novel deep learning architecture to analyze video feeds, detect dangerous crowd patterns, and alert authorities *before* a disaster occurs.

## 1. The Problem
In a highly populated country like India, stampedes at large gatherings (festivals, rallies, concerts) pose a significant and recurring threat to human lives. Traditional surveillance relies on human operators, who can't monitor every camera feed at once.

## 2. Our Solution & Key Features
We built a deep learning system that acts as a "smart" eye for surveillance systems. It automatically classifies crowd behavior as "Safe" or "Stampede-Risk" in real-time.

* **Real-time Risk Analysis:** Processes video frames to provide a live "risk score."
* **High Accuracy:** The core model is validated with an **89.24% average accuracy**.
* **Scale-Invariant (Our Key Innovation):** Typical "head-counting" models fail when cameras are too far away. Our Multi-Column CNN (MCNN) architecture uses filters of varying sizes, allowing it to accurately analyze crowd patterns from **both near and far camera angles**.
* **Lightweight & Efficient:** Uses a custom Autoencoder to compress video frames before analysis. This reduces the computational load, making real-time prediction feasible.

## 3. How It Works: The Model Architecture
Our solution is a two-stage pipeline: an Autoencoder for feature compression and an MCNN for classification.

### Stage 1: Autoencoder (Efficient Feature Extraction)
Raw 100x100 grayscale images (10,000 pixels) are too large for real-time classification. We first pass the image through an **Autoencoder** to compress it into a dense 2,500-pixel feature vector. This intelligently preserves the most important patterns while discarding noise.

<img src="https://github.com/Prateekpkini/IndraNetra/blob/main/Backend/img2.png" width="600" />

### Stage 2: Multi-Column CNN (Scale-Invariant Classification)
This 2,500-pixel vector is then fed into our novel **Multi-Column Convolutional Neural Network (MCNN)**.

* The MCNN has **3 parallel columns** with different-sized filters (9x9, 7x7, 5x5).
* This allows the model to detect crowd patterns (like density and flow) at **multiple scales simultaneously**.
* The outputs are merged and passed to a sigmoid function, which outputs the final classification: (0) for Non-Stampede or (1) for Stampede.

This multi-scale approach is what makes our solution unique and robust, allowing it to outperform models that only look for one feature, like "head count."

<img src="https://github.com/Prateekpkini/IndraNetra/blob/main/Backend/img1.png" width="800" />

## 4. Results & Validation
The model was trained and validated on a custom dataset of 1200+ images compiled from various sources. The dataset was manually labeled as `stampede` (1) or `non-stampede` (0).

The final trained model achieved a stable **average accuracy of 89.24%** over 5-fold validation.

|  |  |
| :---: | :---: |
| **Autoencoder Loss (lower is better)** | **MCNN Accuracy (higher is better)** |

`For a more detailed technical breakdown, please see the Report.pdf and Presentation.pdf in this repository.`

## 5. Getting Started

### Prerequisites
* Python 3.8+
* TensorFlow
* OpenCV
* Other dependencies (see `requirements.txt`)

### Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Prateekpkini/IndraNetra.git](https://github.com/Prateekpkini/IndraNetra.git)
    cd CrowdControl
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Project:**
    * **To re-train the model:**
        The `main.py` script contains the full pipeline for loading the dataset and training both the Autoencoder and the MCNN.
        ```bash
        python main.py
        ```
    * **To run the real-time demo (Hackathon Prototype):**
        *(Note: This assumes a `app.py` Flask server and `index.html` frontend)*
        ```bash
        # 1. Start the backend prediction server
        python app.py
        
        # 2. Open index.html in your browser to view the live dashboard
        ```

## 6. Constraints
* **Dataset:** Our dataset was manually compiled from various sources and was not readily available. We had to manually label all 1200+ images. We are confident that with a larger, professionally-labeled dataset, the model's accuracy would improve even further.

## 7. Authors
* **Prateek Prakash Kini** 
* **Pragathi** 
* **Pramod S B**
* **Sinchana UA** 
