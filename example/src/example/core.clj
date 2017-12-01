(ns example.core
  (:require [uswitch.lambada.core :refer [deflambdafn]]
            [clojure.java.io :as io]
            [clojure.data.json :as json]))

(deflambdafn fi.hjhamala.Example
             [in out ctx]
             (println "We are running in AWS!")
             (with-open [w (io/writer out)]
              (json/write {:body (json/json-str {:message "ok"})} w)))
