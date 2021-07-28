CREATE PROCEDURE `Populate_Dim_Date`(IN Start_Date DATE,IN End_Date DATE)
BEGIN
    
    DELETE FROM CalendarDates
	WHERE CalendarDates.Calendar_Date BETWEEN Start_Date AND End_Date;
    SET @Date_Counter = Start_Date;
    
    WHILE @Date_Counter <= End_Date DO
		SET @Calendar_Month = EXTRACT(MONTH from @Date_Counter);
		SET @Calendar_Day = EXTRACT(DAY from @Date_Counter);
		SET @Calendar_Year = EXTRACT(YEAR from @Date_Counter);
		SET @Calendar_Quarter = EXTRACT(QUARTER from @Date_Counter);
		SET @Day_of_Week = WEEKDAY(@Date_Counter);
		SET @Day_of_Year = DAYOFYEAR(@Date_Counter);
		SEt @Day_Name = CASE @Day_of_Week
			WHEN 6 THEN 'Sunday'
			WHEN 0 THEN 'Monday'
			WHEN 1 THEN 'Tuesday'
			WHEN 2 THEN 'Wednesday'
			WHEN 3 THEN 'Thursday'
			WHEN 4 THEN 'Friday'
			WHEN 5 THEN 'Saturday'
		END;
	 
		SET @Month_Name = CASE @Calendar_Month
			WHEN 1 THEN 'January'
			WHEN 2 THEN 'February'
			WHEN 3 THEN 'March'
			WHEN 4 THEN 'April'
			WHEN 5 THEN 'May'
			WHEN 6 THEN 'June'
			WHEN 7 THEN 'July'
			WHEN 8 THEN 'August'
			WHEN 9 THEN 'September'
			WHEN 10 THEN 'October'
			WHEN 11 THEN 'November'
			WHEN 12 THEN 'December'
		END;
		SET @Is_Leap_Year = CASE
			WHEN @Calendar_Year % 4 <> 0 THEN 0
			WHEN @Calendar_Year % 100 <> 0 THEN 1
			WHEN @Calendar_Year % 400 <> 0 THEN 0
			ELSE 1
		END;
	 
		SET @Days_in_Month = CASE
			WHEN @Calendar_Month IN (4, 6, 9, 11) THEN 30				
								WHEN @Calendar_Month IN (1, 3, 5, 7, 8, 10, 12) THEN 31
			WHEN @Calendar_Month = 2 AND @Is_Leap_Year = 1 THEN 29
			ELSE 28
		END;
		
		INSERT INTO Dim_Date
		(Calendar_Date, Calendar_Month, Calendar_Day, Calendar_Year, 
		Calendar_Quarter, Day_Name, Day_of_Week, Day_of_Year, Week_of_Year, 
		Month_Name, Is_Leap_Year, Days_in_Month)
		SELECT
			@Date_Counter AS Calendar_Date,
			@Calendar_Month AS Calendar_Month,
			@Calendar_Day AS Calendar_Day,
			@Calendar_Year AS Calendar_Year,
			@Calendar_Quarter AS Calendar_Quarter,
			@Day_Name AS Day_Name,
			@Day_of_Week AS Day_of_Week,
			@Day_of_Year AS Day_of_Year,
			@Week_of_Year AS Week_of_Year,
			@Month_Name AS Month_Name,
			@Is_Leap_Year AS Is_Leap_Year,
			@Days_in_Month AS Days_in_Month;
	 
		SET @Date_Counter = DATE_ADD( @Date_Counter,INTERVAL 1 DAY);
        END WHILE;
END