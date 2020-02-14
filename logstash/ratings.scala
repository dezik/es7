import org.elasticsearch.spark.sql._
import spark.implicits._

case class Rating(userId:Int, movieId:Int, rating:Float, timestamp:Int)

def mapper(line:String): Rating = {
    val fields = line.split(',')
    val rating:Rating = Rating(fields(0).toInt, fields(1).toInt, fields(2).toFloat, fields(3).toInt)
    return rating
}

val lines = spark.sparkContext.textFile("ml/ratings.csv")
val header = lines.first()
val data = lines.filter(row=>row!=header)
val ratings = data.map(mapper).toDF()

ratings.saveToEs("spark-ratings")